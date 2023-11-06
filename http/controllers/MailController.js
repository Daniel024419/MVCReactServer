const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const logger = require('../../logger');

// Load environment variables
const {
  EMAIL_USERNAME,
  CLIENT_ID,
  CLIENT_SECRET,
  REFRESH_TOKEN,
  PROTON_USERNAME,
  PROTON_PASSWORD,
  EMAIL_USERNAME_MAIL_TRAP,
  PASSWORD_MAIL_TRAP,
} = process.env;

// Create an OAuth2 client
const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET);
oauth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

// Get the refreshed access token
const getAccessToken = async () => {
  try {
    const accessToken = await oauth2Client.getAccessToken();
    return accessToken;
  } catch (error) {
  logger.log('error','['+Date()+'] Network Error getting access token,net not conncted or '+error);
  }
};

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: EMAIL_USERNAME,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: getAccessToken(), // Call the function to get the access token
  },
});

// Function to send an email
async function sendEmailWithRefreshedToken() {
  try {
    // Example email sending
    const mailConfigurations = {
      from: EMAIL_USERNAME,
      to: 'daniel.mensah@amalitech.org',
      subject: 'Hello, World!',
      text: 'This is a test email sent from Nodemailer with Gmail OAuth2 authentication.',
    };

    // transporter.sendMail(mailConfigurations, (error, info) => {
    //   if (error) {
    //     console.error('Error sending email:', error);
    //   } else {
    //     console.log('Email sent:', info.response);
    //   }
    // });
  } catch (error) {
    logger.log('error','['+Date()+'] An error occurred sending mail:', error);
  }
}

// Initialize by sending an email
//sendEmailWithRefreshedToken();

// Export transporter and token
module.exports = {
  transporter: transporter,
 };
