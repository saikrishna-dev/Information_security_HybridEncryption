
'use strict';
const crypto = require('crypto');
module.exports = {
    enc: function (ENC_KEY,IV,val) {
        var AESencrypt = ((val) => {
            let cipher = crypto.createCipheriv('aes-256-cbc', ENC_KEY, IV);
            let encrypted = cipher.update(val, 'utf8', 'base64');
            encrypted += cipher.final('base64');
            return encrypted;
          });
          var encrypted = AESencrypt(val);  
        //   console.log(encrypted_key);
          return encrypted;
       
    },
    rsaenc: function (publicKey,data){
        const encryptedData = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            },
            Buffer.from(data)
        )
        // console.log("encypted data: ", encryptedData.toString("base64"))
        
        return  encryptedData
    }
  };