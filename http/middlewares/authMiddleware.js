
const session = require('express-session');
const express = require('express'); 
const app = express();

AuthMiddleware = async  (req, res, next) => {
   
    // const Authenticated = req.session.Authenticated;
      const Authenticated = true;


    function isAuthenticated() {
        
        if(Authenticated){
        return true;
        }else{
        return false;
        }
    }
     
    // Check if the user is authenticated (using session or any other method)
    if (!isAuthenticated()) {
      // User is not authenticated, redirect to login page or send an unauthorized response
      res.status(401).json({message : 'Unauthorized Access'}); 
      // Or you can send an unauthorized response:
       //res.status(401).send('Unauthorized');
    }

    next();
  }

  module.exports={
    AuthMiddleware:AuthMiddleware,
  }