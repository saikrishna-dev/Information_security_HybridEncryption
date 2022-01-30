
'use strict';
const crypto = require('crypto');
module.exports = {
    dec: function (ENC_KEY,IV,encrypted) {
        var AESdecrypt = ((encrypted) => {
            let decipher = crypto.createDecipheriv('aes-256-cbc', ENC_KEY, IV);
            let decrypted = decipher.update(encrypted, 'base64', 'utf8');
            return (decrypted + decipher.final('utf8'));
          });
        var original_phrase = AESdecrypt(encrypted);
        // console.log(original_phrase);  
        return original_phrase;
          
          

    },
    rsadec: function(privateKey,encryptedData){
        const decryptedData = crypto.privateDecrypt(
            {
                key: privateKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            },
            encryptedData
        )
        // console.log("decrypted data: ", decryptedData)
        // console.log(encryptedData)
        // console.log(decryptedData)
        return decryptedData;
        
        
    }
  };