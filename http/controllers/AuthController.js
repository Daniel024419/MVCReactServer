
//file system
const fs = require("fs");
const {connectToDB ,closeDB }= require('../../config/mongodbconfig');
//path
const path = require("path");
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');
//multer and upload location
const multer = require("multer");
const bcrypt = require('bcryptjs');

const User_Session = {
  userID: "",
  username: "",
  password: "",
  profile: "",
  created_at: "",
  updated_at: "",
  usermail: "",
  role: "",
  tel: ""
 
};




auth = async (req, res, next) => {

//fetch user role from db
var user_input_mailOrUsername = req.body.userName;
var password_input = req.body.password;

// Function to hash the password
const hashPassword = async (password) => {
 const saltRounds = 10; // The number of salt rounds
  return bcrypt.hash(password, saltRounds);
}

const hashedPassword = await hashPassword(password_input);
console.log(password_input+" "+ hashedPassword);

// Secret key for JWT signing and verification (keep it secret)
const secretKey = process.env.token_secret;


  let db;

  try {
 
    //query
    db = await connectToDB();

    const collection = db.collection('users');

    const userData = await collection.findOne({
      $or: [
        { username: user_input_mailOrUsername },
        { usermail: user_input_mailOrUsername },
      ],
     // password: password_input,
    });

//user found
if (userData) {

// Compare the hashed password from the database with the input password
const isPasswordValid = await bcrypt.compare(password_input, userData.password);


if (isPasswordValid) {
  
// User information you want to include in the JWT payload
const user_token = {
  userID: userData.userID,
  username: userData.username,
};
  // Generate a JWT
  const token = jwt.sign(user_token, secretKey, { expiresIn: '24h' }); // '1h' means the token expires in 1 hour

   User_Session.userID=userData.userID;
   User_Session.username=userData.username;
   User_Session.profile=userData.profile;
   User_Session.created_at=userData.created_at;
   User_Session.updated_at=userData.updated_at;
   User_Session.usermail=userData.usermail;
   User_Session.role=userData.role;
   User_Session.tel=userData.tel;
   req.session.Authenticated = true;
   const Authenticated = req.session.Authenticated;
   req.session.User = User_Session;
   //req.session.save();
   const sessionuser = req.session.User;
   console.log(userData);

    res.status(200).json({userData , message:"Authenticated as "+user_input_mailOrUsername 
    ,token,statusCode:200});

  }
  else{

 res.status(200).json({message : "Password Error... ",statusCode:401});
 console.log("user not Authorized: code  401");
  //send password error response back
  }

}//end password check

  // end user found
  else  {

    res.status(200).json({message : "User not found.. ",statusCode:404});
    console.log("no user found 404");

    }


  } catch (e) {
    if (e) {
    console.log("auth error logging /  internal error", e);
    } 
   
  }
  finally {
    if (db) {
     closeDB();
    }

  }
 
};


const logout = async (  req , res , next )=>{

req.session.destroy( ( err )=>{


if (!err){

   User_Session.userID="";
   User_Session.username= "";
   User_Session.profile= "";
   User_Session.created_at="";
   User_Session.updated_at="";
   User_Session.usermail="";
   User_Session.role="";
   User_Session.tel="";

res.status(200).json({message : "Account logout sucsessfully.. ",statusCode:200});


console.log("user logged out sucsessfully")
}

else{

 res.status(200).json({message : "Account logout failed ",statusCode:501});
 
}

});




}

module.exports = {
  auth: auth,
  logout:logout
};
