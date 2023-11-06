const express = require('express'); 
const app = express();
const multer = require("multer");
const mongodbconfig= require('./config/mongodbconfig');
const db_con = mongodbconfig.connectToDB;
//db_con();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//auth origins
const cors = require('cors');
// Enable CORS for all routes
app.use(cors());

var bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
///env viriables
const dotenv = require("dotenv");
dotenv.config();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true })
const session = require('express-session');
const EventEmitter = require('events'); 
// Increase the event listener limit for Express (change 15 to your desired limit)
EventEmitter.setMaxListeners(100);
//path
const path = require("path");
// Initialization cookie
app.use(cookieParser());
app.use(express.json());
//defined port or 3sfs000
const PORT = process.env.PORT || 3001;
app.use(bodyParser.json());

app.use(urlencodedParser);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// time to live for cookies
const oneDay=100*60*60*24;
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false,
    cookie:{name: 'google-auth-session',
    keys: ['key1', 'key2'],
    maxAge:oneDay},
}));

//global files
app.use(express.static(path.join(__dirname, 'assets', 'files')));
//serve react build
app.use(express.static(path.join(__dirname, 'build')));

//middlewares
const Middlewares  = require('./http/middlewares/authMiddleware');


//controllers
//index conrollers
const  IndexController  = require('./http/controllers/IndexController');

//auth
const AuthController  = require('./http/controllers/AuthController');


//update user profile
const UpdateUserController  = require('./http/controllers/UpdateUserController');


//Add users
const AddUserController  = require('./http/controllers/AddUserController');

// users
const UsersContoller  = require('./http/controllers/UsersContoller');


//artisans
const ArtisansController = require('./http/controllers/ArtisansController');

//VerificationController
VerificationController = require('./http/controllers/VerificationController');

//error_404
const error_404_PNF  = require('./http/controllers/error_404');


//  configuring the location for file upload
// Define the storage location and file name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/files"); // Folder where the uploaded file will be stored
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

//  configuring the location for file upload
// Define the storage location and file name
const storage2 = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "assets/files"); // Folder where the uploaded file will be stored
  },
  filename: (req, file, callback) => {
    const { 
    username,
    usermail,
    userID,
} = req.body.formData;
    const fileName = file.originalname

    callback(null, userID+"-"+fileName);
  },
});

const storage3 = multer.diskStorage({
  destination: (req, file, callback) => {
  callback(null, "assets/files"); 
    // Folder where the uploaded file will be stored
  },
  filename: (req, file, callback) => {
  //const userID = UpdateUserController.randomstring;
  const fileName = file.originalname

let now = new Date();
let hours = now.getHours();
let year = now.getFullYear();

let timestamp = hours+""+year;
  
    callback(null,timestamp+"-"+fileName);
  },
});

const upload = multer({ storage: storage });
const profileUpload = multer({ storage: storage2 });
const profileUploadpic = multer({ storage: storage3 });


 // var YOUR_CLIENT_ID = '530295393593-8fgv9m3h3ccc90cf6dlht76i971kptk2.apps.googleusercontent.com';
 // var YOUR_CLIENT_SECRET = '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';

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID:  process.env.CLIENT_ID_LOGIN,
  clientSecret: process.env.CLIENT_SECRET_LOGIN,

  //developing
  //  callbackURL: process.env.SERVER_APP_URL_DEV+'/auth/callback',
  
  //production
  callbackURL: process.env.SERVER_API_URL_PRO+'/auth/callback',

}, (accessToken, refreshToken, profile, done) => {
  // 'profile' contains user information, including the email
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Auth 
app.get('/google/auth', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.email' ],
}));

app.get('/auth/callback',
  passport.authenticate('google', { failureRedirect: '/auth/callback/failure' }),
AuthController.googleUthCallback
);

//end
// failure
app.get('/auth/callback/failure',
  (req, res) => {
    console.log("google auth error");
  });

// Middleware for authentication
app.use('/auth', Middlewares.AuthMiddleware);

//login / authenticate users
app.post('/login/users',AuthController.auth);

//update user details
app.post('/auth/update/user-profile-picture',profileUploadpic.single("file"),UpdateUserController.UpdateUserProfile);


//update user details
app.post('/auth/edit/edit-user-profile-picture',profileUploadpic.single("file"),UpdateUserController.EditUserProfile);


//update user details
app.post('/auth/update/user-details',UpdateUserController.UpdateUserData);

//fetch user details
app.get('/auth/fetch-user-profile/:profile',UpdateUserController.fetchUserProfile);


//add user details
app.post('/auth/add-new-user',profileUpload.single("file"),AddUserController.AddUser);

//UsersContoller
app.get('/auth/fetch-users',UsersContoller.Users);

//deleteUsers
app.delete('/auth/delete-users/:userID',UsersContoller.deleteUsers);
//edit user

app.post('/auth/edit/edit-user-details',UsersContoller.EditUsersDetails);




//artisans controller 
app.get('/auth/fetch-artisans',ArtisansController.artisans);
//deleteUsers
app.delete('/auth/delete-artisan/:artisanId',ArtisansController.deleteArtisan);




//verify user mail
app.post('/auth/user/verify-usermailorTel',VerificationController.VerifyUsermail);

//update forgot passord 
app.post('/auth/user/update-forgot-password',VerificationController.UpdateForgotPassword);


//logout
app.get('/logout/users',AuthController.logout);

//end
//serve client
app.get('*',IndexController.index); 




app.listen(PORT, (error) =>{ 
  if(!error)
        console.log("Server is Running on port "+ PORT) 
  else
    console.log("Error occurred, server can't start", error); 
  } 
); 
