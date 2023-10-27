const express = require('express'); 
const app = express();
const multer = require("multer");

const mongodbconfig= require('./config/mongodbconfig');
const db_con = mongodbconfig.connectToDB;
//db_con();

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
    cookie:{maxAge:oneDay},
}));

//global files
app.use(express.static(path.join(__dirname, 'assets', 'files')));
app.use(express.static(path.join(__dirname, 'build')));

//middlewares
const Middlewares  = require('./http/middlewares/authMiddleware');

//index conrollers
const  IndexController  = require('./http/controllers/indexController');

//auth
const AuthController  = require('./http/controllers/AuthController');


//update user profile
const UpdateUserController  = require('./http/controllers/UpdateUserController');


//Add users
const AddUserController  = require('./http/controllers/AddUserController');

// users
const UsersContoller  = require('./http/controllers/UsersContoller');




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

//UsersContoller
app.get('/auth/fetch-users/:user',UsersContoller.Users);


//edit user

app.post('/auth/edit/edit-user-details',UsersContoller.EditUsersDetails);

//logout
app.get('/logout/users',AuthController.logout);

//end
app.get('*',IndexController.index); 




app.listen(PORT, (error) =>{ 
  if(!error)
        console.log("Server is Running on port "+ PORT) 
  else
    console.log("Error occurred, server can't start", error); 
  } 
); 
