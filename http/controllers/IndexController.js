//essentials
const bcrypt = require("bcryptjs");
//files upload to storage
//multer and upload location
const multer = require("multer");
//file system
const fs = require("fs");
//path
const path = require("path");
const { MongoClient } = require("mongodb");

const index = async (req, res, next) => {

  try{
  
  res.sendFile(path.join(__dirname,'../../build','index.html'));

  }catch(e){

    console.log("index error ",e)
  }

};


module.exports= {
  index: index,
};
