const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "Vq9zWabJ#bC3K-FJiBZpZkwAFieullmkk_K5z_hHr068beVGfH5s",
  MONGODB: process.env.MONGODB || "mongodb://mongo:QmdsFSfYauBnDDcyWbQSDvFkxZYJyeEU@interchange.proxy.rlwy.net:11974",
  OWNER_NUM: process.env.OWNER_NUM || "94740326138",
};
