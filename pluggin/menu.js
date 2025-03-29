const {readEnv} = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')
cmd({
    pattern: "menu",
    alias: ["list,cmd"],
    desc: "bot's commands",
    react: "📜",
    category: "main"
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let desc = `*👋 Hello ${pushname}*

*╭─「 ${config.BOT_NAME} 」*
*│◈ ʀᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}*
*│◈ ʀᴀᴍ ᴜꜱᴀɢᴇ : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*│◈ ᴘʟᴀᴛꜰᴏʀᴍ : ${os.hostname()}*
*│◈ ᴠᴇʀꜱɪᴏɴ : 3.0.0*
*╰──────────●●►*

*╭╼╼╼╼╼╼╼╼╼╼*
*├ 1 • MAIN*
*├ 2 • SEARCH*
*├ 3 • DOWNLOAD*
*├ 4 • GROUP*
*├ 5 • OWNER*
*├ 6 • FUN*
*╰╼╼╼╼╼╼╼╼╼╼*

_*🌟 Reply with the Number you want to select*_
(මේ මැසේජ් එක 𝗺𝗲𝗻𝘁𝗶𝗼𝗻 කරලා ඔයාට ඕන 𝗰𝗼𝗺𝗺𝗮𝗻𝗱 එකෙ 𝗻𝘂𝗺𝗯𝗲𝗿 එක දෙන්න.)

> © ᴘᴏᴡᴇʀᴅ ʙʏ ᴛʜᴀʀᴜꜱʜᴀ ꜱᴀɴᴅɪᴘᴀ ᴏꜰᴄ`;

        const vv = await conn.sendMessage(from, { image: { url: config.MENU_IMG}, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                    reply(`
                    

╔════════════════════════╗  
║ 🔧 **𝗠𝗔𝗜𝗡 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗟𝗜𝗦𝗧** 🔧 ║  
╚════════════════════════╝  

╭─━─〔 ⚡ **Commands** ⚡ 〕
┃ ◈ **alive**
┃ ◈ **menu**  
┃ ◈ **menu2**  
┃ ◈ **system**  
┃ ◈ **ping**  
┃ ◈ **runtime**
┃ ◈ **jid**
╰─━─━─━─━─━─━─━─━─╯  

📊 **Total Commands in MAIN:** 7  
 
> © ᴘᴏᴡᴇʀᴅ ʙʏ ᴛʜᴀʀᴜꜱʜᴀ ꜱᴀɴᴅɪᴘᴀ ᴏꜰᴄ

`);

                        break;
                    case '2':               
                        reply(`

╔═════════════════════════════╗  
║ 🔍 **𝗦𝗘𝗔𝗥𝗖𝗛 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗟𝗜𝗦𝗧**    ║  
╚═════════════════════════════╝  

╭─━〔 ⚡ **Commands** ⚡ 〕 
┃ ◈ **yts**  
┃ ◈ **image** 
╰─━─━─━━─━─━─━─━─━─╯  

📊 **Total Commands in SEARCH:** 2

> © ᴘᴏᴡᴇʀᴅ ʙʏ ᴛʜᴀʀᴜꜱʜᴀ ꜱᴀɴᴅɪᴘᴀ ᴏꜰᴄ
`);
                        break;
                    case '3':               
                        reply(`
╔═══════════════════════════════╗  
║ 📥 **𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗟𝗜𝗦𝗧** 📥 ║  
╚═══════════════════════════════╝  

╭─━━〔 ⚡ **Commands** ⚡ 〕 
┃ ◈ **apk**  
┃ ◈ **twitter**  
┃ ◈ **gdrive**  
┃ ◈ **mediafire**  
┃ ◈ **fb**  
┃ ◈ **play**
┃ ◈ **play2**  
┃ ◈ **video**   
┃ ◈ **video2**  
┃ ◈ **yta**  
┃ ◈ **tiktok**
┃ ◈ **ytmp3**
╰─━─━─━─━─━─━─━─━─━─╯  

📊 **Total Commands in DOWNLOAD:** 12
 
> © ᴘᴏᴡᴇʀᴅ ʙʏ ᴛʜᴀʀᴜꜱʜᴀ ꜱᴀɴᴅɪᴘᴀ ᴏꜰᴄ

`);
                    
                        break;
                    case '4':               
                        reply(`
╔════════════════════════════╗  
║ 👥 **𝗚𝗥𝗢𝗨𝗣 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗟𝗜𝗦𝗧** 👥 ║  
╚════════════════════════════╝  

╭─━──━〔 ⚡ **Commands** ⚡ 〕
┃ ◈ **mute**  
┃ ◈ **unmute**  
┃ ◈ **promote**  
┃ ◈ **demote**  
┃ ◈ **del**  
┃ ◈ **add**  
┃ ◈ **admins**  
┃ ◈ **groupdesc**  
┃ ◈ **groupinfo**  
┃ ◈ **gname**  
┃ ◈ **setsubject**  
┃ ◈ **tagall**  
┃ ◈ **hidetag**  
┃ ◈ **unlock**  
┃ ◈ **lock**
┃ ◈ **gname**  
┃ ◈ **join**  
┃ ◈ **leave**  
┃ ◈ **invite**  
┃ ◈ **tagadmin**  
╰─━─━─━─━─━─━─━─━─━━─╯  

📊 **Total Commands in GROUP:** 20  


> © ᴘᴏᴡᴇʀᴅ ʙʏ ᴛʜᴀʀᴜꜱʜᴀ ꜱᴀɴᴅɪᴘᴀ ᴏꜰᴄ
`);
                    break;
                    case '5':               
                        reply(`
╔════════════════════════════╗  
║ 👨‍💻 **𝗢𝗪𝗡𝗘𝗥 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗟𝗜𝗦𝗧** 👨‍💻 ║  
╚════════════════════════════╝  

╭─━〔 🍿 **Commands** 🍿 〕
┃ ◈ **shutdown**  
┃ ◈ **alive**  
┃ ◈ **ping**  
┃ ◈ **clearchats**  
┃ ◈ **block**
┃ ◈ **unblock**
┃ ◈ **repo**
┃ ◈ **owner**
┃ ◈ **owner2**
╰─━━─━─━──━─━─━━─━─╯  

📊 **Total Commands in Owner:** 9

 
> © ᴘᴏᴡᴇʀᴅ ʙʏ ᴛʜᴀʀᴜꜱʜᴀ ꜱᴀɴᴅɪᴘᴀ ᴏꜰᴄ

`);
                    break;
                    case '6':               
                        reply(`
╔═══════════════════════════╗  
║   👨‍💻 *𝗙𝗨𝗡 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗟𝗜𝗦𝗧* 👨‍💻   ║  
╚═══════════════════════════╝  

╭─━〔 🍿 ** Fun Commands** 🍿 〕
┃ ◈ **joke**  
┃ ◈ **flirt**  
┃ ◈ **truth**  
┃ ◈ **dare**  
┃ ◈ **fact**
┃ ◈ **pickupline**
┃ ◈ **character**
┃ ◈ **repeat**
┃ ◈ **spam**
┃ ◈ **readmore**
╰─━━─━─━──━─━─━━─━─╯  

📊 **Total Commands in Owner:** 10

 
> © ᴘᴏᴡᴇʀᴅ ʙʏ ᴛʜᴀʀᴜꜱʜᴀ ꜱᴀɴᴅɪᴘᴀ ᴏꜰᴄ

`);
                       
                        
                    break;
                    default:
                    
                        reply("Invalid option. Please select a valid option🔴");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});
