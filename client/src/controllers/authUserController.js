
// controllers/authUser.js
import authuserCrendentialsModel from '../models/authuserCrendentials';

const authUserController = ( formData ) => {
	// Handle user input, e.g., perform authentication

 const { userName , password } = formData;

  // Call the model function with the provided data
 //do data cleaning here 
  authuserCrendentialsModel.AuthenticateUserModel(userName, password);

}

export  { authUserController ,}