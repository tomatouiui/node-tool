const crypto = require("crypto")
require("../config/env")
const key = Buffer.from(process.env.A, "utf8")
const iv = Buffer.from(process.env.B, "utf8")

module.exports = {
   encrypt(str) {
    let cipher = crypto.createCipheriv("aes192", key, iv)
    cipher.update(str, "utf-8", "hex")
    return cipher.final("hex")
  },
}
