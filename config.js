const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "TWYFyaRa#jPXadGydRX2FWQGqxQb5JqE7oijIOgVdCUeTCY3IkdM",
  OWNER_NUM: process.env.OWNER_NUM || "94740326138",
  PREFIX: process.env.PREFIX || ".",
  ALIVE_IMG: process.env.ALIVE_IMG || "https://i.ibb.co/4wtknv1M/cadad92b37c06b76.jpg",
  ALIVE_MSG: process.env.ALIVE_MSG || "👋 Hellow I`m alive now ♲",
};
