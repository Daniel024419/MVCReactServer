
//file system
const fs = require("fs");
const {connectToDB ,closeDB }= require('../../config/mongodbconfig');
//path
const path = require("path");
//multer and upload location
const multer = require("multer");
  
const bcrypt = require('bcryptjs');
const session = require('express-session');
let db;
const logger = require('../../logger');

const genRandomStr =  () => {

return  Math.random().toString(36).substr(2 ,20);

}

//updating databse with id
let randomstring =  genRandomStr();

const UpdateUserData = async (  req, res , next ) => {

//update user datails here

try{

  const { 
    userID,
    username,
    password,
    role,
    created_at,
    usermail,
    tel,
     } = req.body.formData;

const currentDate = new Date();
 //query
    db = await connectToDB();
   //conncet to table
     let Userdata;
    
const collection = db.collection('users');
let hashedPassword ='';


 //fetching user password,empty
  const userDataPassword = await collection.findOne({
      $or: [
        { username: username },
        { usermail: usermail },
      ],
  });


if (password=='') {

hashedPassword=userDataPassword.password;
 
}else{
// Function to hash the password
const hashPassword = async (password) => {
 const saltRounds = 10; // The number of salt rounds
  return bcrypt.hash(password, saltRounds);
}

hashedPassword = await hashPassword(password);

}



    const userUpdateResult = await collection.updateOne(
      //find user with id
      { userID : userID},
      //update user profile with the new file name...
      { $set: { 

        username : username,
        tel:tel,
        password : hashedPassword,
        usermail : usermail,
        updated_at : currentDate

      }}
      );


    if (userUpdateResult.modifiedCount === 1) {
    // Handle the uploaded file here, save it, or perform any required processing
  

  const userData = await collection.findOne({
      $or: [
        { username: username },
        { usermail: usermail },
      ],
     });

   // console.log(userData)


  res.status(200).json({ message: "User updated successfully", userData, statusCode : 200 });
   
    }else{

    res.status(200).json({ message: "Update failed , Please try again ", statusCode : 501 });
    logger.log('error','['+Date()+'] user update failed..');

    }





}

catch(error){

	logger.log('error','['+Date()+'] can not update user profile/ Internal error' + error)
}

}

// end

//upload user file
const UpdateUserProfile = async ( req ,res ,next ) => {
 //update user datails here
   
  try{
// Get the uploaded file name
  const fileName = req.file.originalname;
  const userID = req.body.userID;
   
let now = new Date();
let hours = now.getHours();
let year = now.getFullYear();

let timestamp = hours+""+year;


    //query
    db = await connectToDB();
   //conncet to table
    const collection = db.collection('users');

    const userUpdateResult = await collection.updateOne(
    	//find user with id
    	{ userID : userID},
    	//update user profile with the new file name...
    	 { $set: { profile : timestamp+"-"+fileName }}
      //{ $set: { profile : fileName }}

    	);
  if (userUpdateResult.modifiedCount === 1) {
  // Handle the uploaded file here, save it, or perform any required processing
  const userData = await collection.findOne({
      $or: [
        { userID: userID },
      ],
     });



  res.status(200).json({ userData ,message: "Profile updated successfully", statusCode : 200 }); 
   
    }else{

    res.status(200).json({ message: "Update failed , Please try again ", statusCode : 501 });
    logger.log('error','['+Date()+'] user profile update failed..fileName : '+timestamp+"-"+fileName);
    }

  }

catch(error){
	logger.log('error','['+Date()+'] can not update user credentials' + error)
}


}


//server user profile
const fetchUserProfile = async ( req ,res , next )=>{
 
  const profile_url = req.params.profile;

  let profile;


  if (profile_url) {

  	 profile = profile_url;

  	//console.log(profile)
   }else{
    //default user picture
  	profile ="user.png"
  }


  try {
    // path to the image on the server
    const imagePath = path.join(process.cwd(), 'assets/files', ''+profile);
    const imageBuffer = fs.readFileSync(imagePath);

    // Set the response header to indicate it's an image
    res.setHeader('Content-Type', 'image/jpeg');

    // Send the image data to the client
    res.status(200).end(imageBuffer);

  } catch (error) {

    logger.log('error','['+Date()+']Error sending image , either dir not found or error '+error);
    res.status(500).end('Internal Server Error');
  }

} 
  


//edit user file
const EditUserProfile = async ( req ,res ,next ) => {
 //update user datails here
   
  try{
// Get the uploaded file name
  const fileName = req.file.originalname;
  const userID = req.body.userID;
  //console.log("User ID from frontend " +userID);
   

let now = new Date();
let hours = now.getHours();
let year = now.getFullYear();

let timestamp = hours+""+year;


    //query
    db = await connectToDB();
   //conncet to table
    const collection = db.collection('users');

    const userUpdateResult = await collection.updateOne(
      //find user with id
      { userID : userID},
      //update user profile with the new file name...
       { $set: { profile : timestamp+"-"+fileName }}
      //{ $set: { profile : fileName }}

      );
  if (userUpdateResult.modifiedCount === 1) {
  // Handle the uploaded file here, save it, or perform any required processing
  const userData = await collection.findOne({
      $or: [
        { userID: userID },
      ],
     });



  res.status(200).json({ userData ,message: "Profile updated successfully", statusCode : 200 });
   
    }else{

    res.status(200).json({ message: "Editing failed , Please try again ", statusCode : 501 });
 
    }

  }

catch(error){
 logger.log('error' , '['+Date()+'] can not update user credentials' + error)
  res.status(200).json({ message: "Editing failed , Please try again ", statusCode : 501 });

}
//close db con
// finally {
//     if (db) {
//      closeDB();
//     }

//   }


}

module.exports = {
  UpdateUserData:UpdateUserData,
  UpdateUserProfile:UpdateUserProfile,
  fetchUserProfile:fetchUserProfile,
  EditUserProfile:EditUserProfile,

  randomstring:randomstring,



};
