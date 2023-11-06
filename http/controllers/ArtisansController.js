//file system
const fs = require("fs");
const {connectToDB ,closeDB }= require('../../config/mongodbconfig');
//path
const path = require("path");
let db;
const logger = require('../../logger');

const artisans  = async (req , res , next) => {
	
try{


//query
db = await connectToDB();

const collection = db.collection('artisans');

//fetching user password,empty
 const artisans = await collection.find().toArray();
 res.json(artisans);

// artisanId: 'dddswew',
//     username: 'Daniel Say',
//     password: 'k22',
//     usermail: 'f@gmail.com',
//     created_at: '2023-11-23',
//     updated_at: '2032-10-32',
//     last_seen: '2034-12-12',
//     expertise: 'Carpenter',
//     location: 'Effia Kuma No.3',
//     work_days: 'Monday-Saturday',
//     profile: 'b.jpg',
//     status: '1',
//     tel: '0269554646'
    

 if (artisans.length < 0) {

 res.status(200).json({ statusCode : 404 });

  }


}
catch(error){
logger.log('error','['+Date()+'] can not fetch artisans.. / internal eror',error);
}


}


const deleteArtisan = async ( req , res , next )=>{

const artisanId = req.params.artisanId;

try{
//query
db = await connectToDB();


const collection = db.collection('artisans');

//fetching user password,empty
const artisan_del = await collection.deleteOne({artisanId:artisanId});

if ( artisan_del.deletedCount===1) {
	
res.status(200).json({message : "Artisan deleted successfully..", statusCode : 200 });


}else{

res.status(200).json({ message : "Failed deleting artisan..",statusCode : 501 });
	
  }

}
catch(error){
logger.log('error','['+Date()+'] can not delete artisan.. / internal eror',error);
}
}


module.exports = {

artisans:artisans,
deleteArtisan:deleteArtisan,
};