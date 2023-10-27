const { MongoClient } = require('mongodb');
const dotenv = require("dotenv");
dotenv.config();

const username = process.env.MongoDbOnlineUsername;
const password = process.env.MongoDbOnlinePass;
const MongoDbOnlineDbname = process.env.MongoDbOnlineDbname;
const clusterName = 'Cluster0';

//offline db
//const dbName = process.env.dbNameOffline; 

// MongoDB connection URL
//const url = 'mongodb://localhost:27017'; // Replace with your MongoDB connection URL


const url = "mongodb+srv://"+username+":"+password+"@"+clusterName+".uzkrp1a.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

async function connectToDB() {
  try {
    await client.connect();
    //console.log('Connected to the database');

    const db = client.db(MongoDbOnlineDbname);

    //schema
//create them when not found
    const collectionNames = ["users", "posts", "comments"];
    
    for (const collectionName of collectionNames) {
      const collectionExists = await db.listCollections({ name: collectionName }).hasNext();
      
      if (collectionExists) {
        console.log(`Collection "${collectionName}" already exists.`);
      } else {
        try {
          await db.createCollection(collectionName);
          console.log(`Collection "${collectionName}" created.`);
        } catch (err) {
          console.error(`Error creating collection "${collectionName}": ${err}`);
        }
      }
    }

    return db;
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

function closeDB() {
  if (client) {
    client.close().then(() => {
      console.log('Connection to the database closed');
    }).catch(error => {
      console.error('Error closing the database connection:', error);
    });
  }
}

module.exports = { connectToDB, closeDB };
