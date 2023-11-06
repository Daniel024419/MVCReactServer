 //file system
const fs = require("fs");
const {connectToDB ,closeDB }= require('../../config/mongodbconfig');
//path
const path = require("path");
const jwt = require('jsonwebtoken');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const logger = require('../../logger');

//node mailer
const mailHelper = require('../controllers/MailController');
var transporter = mailHelper.transporter;

var EMAIL_USERNAME = process.env.EMAIL_USERNAME;
var MNOTIFY_API_KEY = process.env.MNOTIFY_API_KEY;
var SENDER_ID = process.env.SENDER_ID;
var SERVER_NAME = process.env.SERVER_NAME;
let db;
const VerifyUsermail  = async ( req , res , next ) => {
// Secret key for JWT signing and verification (keep it secret)
const secretKey = process.env.token_secret;
	


try{
//query
db = await connectToDB();
//02434343434
const { usermailorTel } =req.body;
const randomNumbers= Math.floor(Math.random() * 1000000);
console.log(req.body.usermailorTel)
const collection = db.collection('users');

    const userData = await collection.findOne({
      $or: [
        { usermail: usermailorTel },
        { tel:usermailorTel },
      ],
     });

if(userData){
// User information you want to include in the JWT payload
const user_token = {
  userID: userData.userID,
  username: userData.username,
};
// Generate a JWT
const token = jwt.sign(user_token, secretKey, { expiresIn: '24h' }); // '1h' means the token expires in 24 hours

let senderType='';

//phone number/mail validation
const phoneRegex=/^\d{10}$/;
const mailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
//check if telephone number or mail
if(phoneRegex.test(usermailorTel)){
senderType="telephone number"

const message = 'Hello ' + userData.username + ', Your single-use code is : '+ randomNumbers +' ' + SERVER_NAME ;
// Construct the API URL
const apiUrl = `https://apps.mnotify.net/smsapi?key=${MNOTIFY_API_KEY}
&to=${usermailorTel}&msg=${message}&sender_id=${SENDER_ID}`;
// Send the SMS
axios.get(apiUrl).then(response => {
//console.log('SMS sent successfully');
//console.log(response.data); // Optional: Log the API response
}).catch(error => {
logger.log('error','['+Date()+'Failed to send unique code SMS:', error);
   });

//console.log("sms sent "+usermailorTel);


}else if(mailRegex.test(usermailorTel)){
senderType="mail";
                            // Function to send an email
                            async function sendEmailWithRefreshedToken() {
                                try {
                                    //send token after verifying password
                                    const mailConfigurations = {
                                        // It should be a string of sender/server email
                                        from: EMAIL_USERNAME,
                                        to: usermailorTel,
                                        // Subject of Email
                                        subject: 'Account Recovery',
                                        // This would be the text of email body
                                        //  + user +
                      html: `<h1>Hi</h1><p>,${userData.username},</p> 
                      Your single-use code to is :<b> ${randomNumbers}</b> <br>
                      <p>If you did not request for
                       this code, you can ignore if you didn't initiate this. </p>
                       <br> <h1>${SERVER_NAME} <h1>`
                                    };
                                    transporter.sendMail(mailConfigurations, function(error, info) {
                                       
                                        if (error) {
                                            logger.log('error','['+Date()+'no internet to send mail');
                                        }
                                        //console.log('Email Sent Successfully');
                                    });
                                } catch (error) {
                                    logger.log('error','['+Date()+'An error occurred when sending mail:', error);
                                }
                            }
                            // Initialize by sending an email
                            sendEmailWithRefreshedToken();
}

    res.status(200).json({userData , 
  	message:"Enter the single use code sent to your "+ senderType,
  	token,statusCode:200 ,single_use_code_suc:randomNumbers});
    

    }else{

    res.status(200).json({message : "User not found, try again with valid mail or telephone number ",statusCode:404});

    }

	}
	catch(error){
		res.status(501).json({message : "Please try again.. ",statusCode:501});
		 logger.log('error','['+Date()+'error verifying user mail..'+error);
	}


}




//update forgot password

const UpdateForgotPassword = async (req ,res ,next) => {

try{
//query
db = await connectToDB();
const collection = db.collection('users');
const currentDate = new Date();

const { password , userID }= req.body;

// Function to hash the password
const hashPassword = async (password) => {
 const saltRounds = 10; // The number of salt rounds
  return bcrypt.hash(password, saltRounds);
}

hashedPassword = await hashPassword(password);



const userUpdatePasswordResult = await collection.updateOne(
      //find user with id
      { userID : userID},
      //update user profile with the new file name...
      { $set: { 

        password : hashedPassword,
        updated_at : currentDate,

      }}
);

if (userUpdatePasswordResult.modifiedCount === 1) {
    // Handle the uploaded file here, save it, or perform any required processing
  
  const userData = await collection.findOne({
      $or: [
        { userID: userID },
       ],
     });

console.log(userData)
res.status(200).json({ message: "User updated successfully", userData, statusCode : 200 });
    
    }else{

    res.status(200).json({ message: "Password Update failed , Please try again ", statusCode : 404 });
    logger.log('error','['+Date()+'] error password update failed..');

    }

 }

catch(error){
    logger.log('error','['+Date()+'] can not update forgot password..:'+error);
    res.status(501).json({ message: "Password Update failed , Please try again " });

}



}

 
module.exports={


VerifyUsermail:VerifyUsermail,
UpdateForgotPassword:UpdateForgotPassword,

}
