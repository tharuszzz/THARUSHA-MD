const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  jidNormalizedUser,
  getContentType,
  fetchLatestBaileysVersion,
  Browsers,
} = require("@whiskeysockets/baileys");

const l = console.log;
const {
  getBuffer,
  getGroupAdmins,
  getRandom,
  h2k,
  isUrl,
  Json,
  runtime,
  sleep,
  fetchJson,
} = require("./lib/functions");

const fs = require("fs");
const P = require("pino");
const config = require("./config");
const qrcode = require("qrcode-terminal");
const util = require("util");
const { sms, downloadMediaMessage } = require("./lib/msg");
const axios = require("axios");
const { File } = require("megajs");

const prefix = config.PREFIX;
const ownerNumber = config.OWNER_NUM;

const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

// =================== SESSION-AUTH FIX ==========================
async function downloadSession() {
  if (!config.SESSION_ID) {
    console.error("🚨 Please add your session to SESSION_ID env !!");
    process.exit(1);
  }
  try {
    const sessdata = config.SESSION_ID;
    const filer = File.fromURL(`https://mega.nz/file/${sessdata}`);
    const data = await new Promise((resolve, reject) => {
      filer.download((err, fileData) => {
        if (err) reject(err);
        else resolve(fileData);
      });
    });
    fs.writeFileSync(__dirname + "/auth_info_baileys/creds.json", data);
    console.log("✅ Session downloaded successfully.");
  } catch (error) {
    console.error("❌ Failed to download session:", error.message);
    process.exit(1);
  }
}

if (!fs.existsSync(__dirname + "/auth_info_baileys/creds.json")) {
  downloadSession();
}

// =================== CONNECT TO WHATSAPP ========================
async function connectToWA() {
  console.log("🔌 Connecting to THARUSHA-MD...");
  const { state, saveCreds } = await useMultiFileAuthState(__dirname + "/auth_info_baileys/");
  const { version } = await fetchLatestBaileysVersion();

  const robin = makeWASocket({
    logger: P({ level: "silent" }),
    printQRInTerminal: false,
    browser: Browsers.macOS("Firefox"),
    syncFullHistory: true,
    auth: state,
    version,
  });

  robin.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const reason = lastDisconnect?.error?.output?.statusCode;
      if (reason === DisconnectReason.loggedOut) {
        console.error("❌ Session logged out. Please reauthenticate.");
        process.exit(1);
      } else {
        console.warn("⚠️ Connection lost. Reconnecting...");
        connectToWA();
      }
    } else if (connection === "open") {
      console.log("✅ THARUSHA-MD successfully connected to WhatsApp!");

      // Notify owner
      robin.sendMessage(ownerNumber + "94740326138@s.whatsapp.net", {
        image: { url: `https://i.ibb.co/4wtknv1M/cadad92b37c06b76.jpg` },
        caption: "THARUSHA-MD connected successfully ✅",
      });
    }
  });

  robin.ev.on("creds.update", saveCreds);

  // =================== MESSAGE HANDLER ========================
  robin.ev.on("messages.upsert", async (mek) => {
    try {
      mek = mek.messages[0];
      if (!mek.message) return;

      mek.message = getContentType(mek.message) === "ephemeralMessage"
        ? mek.message.ephemeralMessage.message
        : mek.message;

      if (mek.key?.remoteJid === "status@broadcast") return;

      const m = sms(robin, mek);
      const from = mek.key.remoteJid;
      const body = mek.message?.conversation || "";
      const isCmd = body.startsWith(prefix);
      const command = isCmd ? body.slice(prefix.length).trim().split(" ").shift().toLowerCase() : "";
      const args = body.trim().split(/ +/).slice(1);
      const q = args.join(" ");
      const isGroup = from.endsWith("@g.us");
      const sender = mek.key.fromMe ? robin.user.id.split(":")[0] + "@s.whatsapp.net" : mek.key.participant || mek.key.remoteJid;
      const senderNumber = sender.split("@")[0];
      const botNumber = robin.user.id.split(":")[0];
      const pushname = mek.pushName || "User";
      const isMe = botNumber.includes(senderNumber);
      const isOwner = ownerNumber.includes(senderNumber) || isMe;
      const groupMetadata = isGroup ? await robin.groupMetadata(from).catch(() => null) : null;
      const groupName = isGroup ? groupMetadata.subject : "";
      const participants = isGroup ? groupMetadata?.participants || [] : [];
      const groupAdmins = isGroup ? getGroupAdmins(participants) : [];
      const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
      const isAdmins = isGroup ? groupAdmins.includes(sender) : false;

      const reply = (text) => {
        robin.sendMessage(from, { text }, { quoted: mek });
      };

      // ================ Command Handling =================
      if (isCmd) {
        const events = require("./command");
        const cmd = events.commands.find((c) => c.pattern === command || (c.alias && c.alias.includes(command)));

        if (cmd) {
          if (cmd.react) {
            robin.sendMessage(from, { react: { text: cmd.react, key: mek.key } });
          }

          try {
            await cmd.function(robin, mek, m, {
              from, quoted: mek, body, isCmd, command, args, q, isGroup, sender,
              senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata,
              groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
            });
          } catch (error) {
            console.error(`❌ Error in command ${command}:`, error.message);
            reply("⚠️ An error occurred while executing the command.");
          }
        }
      }
    } catch (error) {
      console.error("❌ Error processing message:", error.message);
    }
  });
}

// =================== EXPRESS SERVER ========================
app.get("/", (req, res) => {
  res.send("✅ THARUSHA-MD is running...");
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

setTimeout(connectToWA, 4000);
