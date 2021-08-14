const process = require("process");
const fs = require('fs');
const pinataSDK = require('@pinata/sdk');
const PINATA_API_KEY = '79e863d680ef57972f8e'; 
const PINATA_SECRET_API_KEY = '4f597a33faba3d5a4ed80e73e2ea9d82a78bce77aa7b175e080afdfeff5a46ef'; 
const pinata = pinataSDK(PINATA_API_KEY, PINATA_SECRET_API_KEY);

var imgPath = process.arv[2]; 
const readableStreamForFile = fs.createReadStream(imgPath); 
const options = {};

pinata.pinFileToIPFS(readableStreamForFile, options).then((result)=>{
    console.log(result["IpfsHash"])
}).catch((err) => {
    console.log(err)
});