const crypto = require('crypto');
// Örnek AES şifreleme
require('dotenv/config')
const algorithm = 'aes-256-cbc'
const key =Buffer.from(process.env.KEYS,'hex') // 32 byte (256 bit) bir anahtar oluştur 
const iv = Buffer.from(process.env.IV,'hex')// Initialization Vector oluştur  
let encrypted
let decrypted
const encrypt=(data)=>{
   
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    encrypted = cipher.update(data, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}
const decrypt=(data)=>{
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    decrypted = decipher.update(data, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}

module.exports={encrypt,decrypt}