const { 
  default: makeWASocket, 
  useMultiFileAuthState, 
  DisconnectReason, 
  fetchLatestBaileysVersion, 
  Browsers 
} = require("@whiskeysockets/baileys");

const fs = require("fs");
const P = require("pino");
const express = require("express");
const config = require("./config");

const sessionPath = __dirname + "/auth_info_baileys/";
const ownerNumber = config.OWNER_NUM + "@s.whatsapp.net"; // Owner Number

const app = express();
const port = process.env.PORT || 8000;
app.get("/", (req, res) => res.send("🤖 Bot is running!"));
app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));

async function connectToWA() {
  console.log("⚡ Connecting to WhatsApp...");
  
  const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
  let version;
  
  try {
    version = (await fetchLatestBaileysVersion()).version;
  } catch (err) {
    console.log("⚠️ Failed to fetch latest Baileys version, using default.");
    version = [2, 2323, 4]; // Default version
  }

  const robin = makeWASocket({
    logger: P({ level: "silent" }),
    printQRInTerminal: false,
    browser: Browsers.macOS("Firefox"),
    syncFullHistory: true,
    auth: state,
    version,
  });

  robin.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      let reason = lastDisconnect?.error?.output?.statusCode;
      if (reason !== DisconnectReason.loggedOut) {
        console.log("🔄 Reconnecting...");
        connectToWA();
      } else {
        console.log("❌ Logged out. Please scan QR code again.");
        process.exit(1);
      }
    } else if (connection === "open") {
      console.log("✅ Connected to WhatsApp!");

      let imageURL = "https://i.ibb.co/1J9Xp6gJ/304909ee1ba2d9fa.jpg"; // Image URL
      let captionText = `🤖 *Bot Connected Successfully!*\n\n✅ *Status:* Running\n🕒 *Time:* ${new Date().toLocaleString()}\n🔹 *Owner:* @${config.OWNER_NUM}`;

      await robin.sendMessage(ownerNumber, {
        image: { url: imageURL },
        caption: captionText,
        mentions: [ownerNumber] // Mention owner
      });

      console.log("✅ Connection message with image & caption sent!");
    }
  });

  robin.ev.on("creds.update", saveCreds);
}

// Start bot after a delay
setTimeout(connectToWA, 4000);
