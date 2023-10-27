const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const username = process.env.MongoDbOnlineUsername;
const password = process.env.MongoDbOnlinePass;
const clusterName = 'Cluster0';
const dbName = process.env.MongoDbOnlineDbname; // Your database name

//offline db
//const dbName = process.env.dbNameOffline; 

// MongoDB connection URL
//const url = 'mongodb://localhost:27017'; // Replace with your MongoDB connection URL


const url = `mongodb+srv://${username}:${password}@${clusterName}.uzkrp1a.mongodb.net/${dbName}?retryWrites=true&w=majority`;

// Create a Mongoose connection
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
    // Call your connectToDB function to establish the connection
  //  connectToDB();
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });


      // Modify your connectToDB function to work with Mongoose
async function connectToDB() {
      try {
        
        // Check if collections exist and create them if needed
        const collectionNames = ["users", "posts", "comments"];
        collectionNames.forEach(async (collectionName) => {
          const collectionExists = await mongoose.connection.db.listCollections({ name: collectionName }).hasNext();
          if (!collectionExists) {
            await mongoose.connection.db.createCollection(collectionName);
            console.log(`Collection "${collectionName}" created.`);
          }
        });

        return mongoose.connection; // Return the Mongoose connection
      } catch (error) {
        console.error('Error connecting to the database:', error);
      }
    }


  // closeDB function to work with Mongoose
    function closeDB() {
      // Close the Mongoose connection when you're done
      mongoose.connection.close()
        .then(() => {
          console.log('Connection to the database closed');
        })
        .catch((error) => {
          console.error('Error closing the database connection:', error);
        });
    }



  // Export the modified functions
    module.exports = { connectToDB, closeDB };

  