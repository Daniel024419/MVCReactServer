//essentials
const bcrypt = require("bcryptjs");
//files upload to storage
//multer and upload location
const multer = require("multer");
//file system
const fs = require("fs");
//path
const path = require("path");

const index = async (req, res, next) => {

  try{
  
  res.sendFile(path.join(__dirname,'../../build','index.html'));

  }catch(error){

    //console.log("index error ",e)
  }

};


module.exports= {
  index: index,
};
