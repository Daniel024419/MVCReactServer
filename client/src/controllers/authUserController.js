import React from 'react'
import PropTypes from 'prop-types'

// controllers/authUser.js
import authuserCrendentialsModel from '../models/authuserCrendentials';

const authUserController = ( formData ) => {
	// Handle user input, e.g., perform authentication

 const { userName , password } = formData;

  // Call the model function with the provided data
  authuserCrendentialsModel.AuthenticateUserModel(userName, password);

}

export  { authUserController ,}