'use strict'
const Env = use('Env')
const CryptoJS = require("crypto-js");
class Crypto {
    async Encrypt(value) {
        let chipertext = await CryptoJS.AES.encrypt(value.toString(), Env.get('SECRET_KEY')).toString()
        return chipertext
    }

    async Decrypt(value) {
        let bytes = await CryptoJS.AES.decrypt(value.toString(), Env.get('SECRET_KEY'));
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText
    }
}

module.exports = new Crypto