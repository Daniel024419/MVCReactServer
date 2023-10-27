const bcrypt = require('bcrypt');
const {connectToDB ,closeDB }= require('../../config/mongodbconfig');


const AddUser = async (req , res , next) => {
let db;
try{

db = await connectToDB();
const collection = db.collection('users');

const { 
    userID,
    username,
    password,
    role,
    created_at,
    usermail,
    created_by,
    file,
    tel,
} = req.body.formData;


  //Get the uploaded file name
 const fileName = req.file.originalname;


//created by   .. 
//console.log("created_by " +created_by);

// Function to hash the password
const hashPassword = async (password) => {
 const saltRounds = 10; // The number of salt rounds
  return bcrypt.hash(password, saltRounds);
}
const hashedPassword = await hashPassword(password);

   const newUser = {
    userID:userID,
    username: username,
    password: hashedPassword,
    profile:userID+"-"+fileName,
    usermail : usermail,
    role:role,
    tel:tel,
    created_at : created_at,
    created_by : created_by,
    last_visit:Date(),
    updated_at: Date(),
    status:0,

   };


    //results
    const results = await collection.insertOne(newUser);
    if (results) {
    console.log('User saved successfully:', results.insertedId);
    res.status(200).json({message:"Account created successfully.. ",statusCode:200});
    }else{
    console.log('User not saved successfully');
    res.status(200).json({message:"Account not created successfully.. ",statusCode:200});

    }

    const users = await collection.find({userID:newUser.userID}).toArray();
    console.log(users);
    
}

catch(error){
 if (error) {
    console.log("can not create user account /  internal error", error);
    res.status(501).json({message : "Internal error... "});
    } 
}

// finally{
// 	if (db) {
//      closeDB();
//     }
// }


}

module.exports = { 
  AddUser:AddUser
}