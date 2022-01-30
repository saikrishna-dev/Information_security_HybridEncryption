
'use strict';
var fs = require('fs');
var crypto = require('crypto');
var express = require('express');
var app=express();
var ejs = require('ejs');
var http = require('http');
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({extended : false});

app.set('view engine','ejs');
const ENC_KEY = "bf3c199c2470cb477d907b1e0917c17b";
const IV = "5183666c72eec9e4";
global.asd;


app.get('/',function(req,res){
  var pass="null"
    res.render('index',{pass:pass});

    });
app.post('/fileup', urlencodeParser, function (req, res) {




const phrase = req.body.i;
var e =require('./Encrypt');
var d=require('./Decrypt');

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
})
const aesciphertext=e.enc(ENC_KEY,IV,phrase);
 const rsaenc=e.rsaenc(publicKey,ENC_KEY);
//after sending it to reciever
const rsadec=d.rsadec(privateKey,rsaenc)
const aesplaintext=d.dec(rsadec.toString(),IV,aesciphertext);
console.log("RSA encrypted AES key:",rsaenc.toString())
console.log("AES CT:",aesciphertext);
console.log("AES PT:",aesplaintext);
console.log(publicKey)
var hk=rsaenc.toString();
var pass={
  st:phrase,
  pt:aesplaintext,
  ct:aesciphertext,
  hk:hk}
res.render('index.ejs',{pass:pass});
});

app.listen(8080);
