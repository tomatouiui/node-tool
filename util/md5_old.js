// nodejs 内置加密模块
const crypto = require("crypto")
// 配置文件获取 secret_key 和 iv
//const { SECRET_KEY, IV } = require("../config")
require("../config/env")
const key = Buffer.from(process.env.A, "utf8")
const iv = Buffer.from(process.env.B, "utf8")

module.exports = {
   // 加密
   encrypt(str) {
    let cipher = crypto.createCipheriv("aes192", key, iv)
    cipher.update(str, "utf-8", "hex")
    return cipher.final("hex")
  },
  // 解密
  dencrypt(encrypt) {
    let decipher = crypto.createDecipheriv("aes192", key, iv)
    decipher.update(encrypt, "hex", "utf8")
    return decipher.final("utf8")
  },
}
