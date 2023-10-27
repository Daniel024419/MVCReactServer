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

 foods = async (req, res, next) => {

  try{
     res.status(200);
  res.send("foods");
  next(); 
  }catch(e){
    console.log("index error ",e)
  }

};


module.exports= {
  foods: foods,
};
