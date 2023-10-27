import React from 'react'
import  {authUserController}  from '../../controllers/authUserController';
//import  {LogoutController}  from '../../controllers/LogoutController';

import '../../css/login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState} from 'react'

import {   Link} from 'react-router-dom';


const Login = ( props ) => {

  let message = localStorage.getItem('message');
  let isAuthenticated =localStorage.getItem('isAuthenticated');

  // Function to clear the notification
  // Regular expression for email validation
  const [isLoading, setIsLoading] = useState(false);

  // Use useEffect to clear the message in localStorage on component load
  useEffect(() => {
    localStorage.removeItem('message');
  }, []);


   //manage user data state 
	const [formData, setformData] = useState({
		userName : '',
		password : '',
	 });


const handleChange = async ( event )=>{
     // Update the state when user types in the input fields
     setformData({...formData ,
      [event.target.name] : event.target.value
     });
   
	}

const handleSubmit = async ( event )=>{

	event.preventDefault();
        // Call the userAuthController and pass the user input
    if (formData.userName === '' || formData.password === '') {
      alert('all input are required ');
      return;
    }

    else{
    //set loading
    setIsLoading(true);

    // Simulate an API request 
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    authUserController(formData);

    }

	}

if (isAuthenticated==="true") {
    window.location.href = '/auth/dashboard';
}


	// const handleLogout = async () =>{
	// 	await LogoutController();

	// 	return;
	// }


	return (
  <div className="login-view">

		<div className="container">
        <div className="left"></div>
        <div className="right">
            <div className="login-form">
                <h2 className="login-title" >Login</h2>
                <form id="login-form" action="" onSubmit={handleSubmit}  >
                    <div className="form-group">
                        <label for="email"  >Username</label>
                        <input type="text" id="email" 
                         name="userName" 
                         onChange={handleChange}
                         placeholder="Enter username or mail" 
                         className="userName" />
                    </div>
                    <div className="form-group">
                        <label for="password">Password:</label>


                        <div className="show-password">
                            <input type="password" 
                            id="password"
                             name="password" 
                             onChange={handleChange}
                             className="password"
                             placeholder="*****************"
                             /> 
                        </div>
                    </div>

<button type="submit" title="login" className="submit-btn" onClick={handleSubmit}>
       {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Login'}
 </button>

<div className="login-options" >

<button type="submit" title="login" className="login-options-submit-btn" onClick={handleSubmit}>
 Login with Google
 </button>

 <button type="submit" title="login" className="login-options-submit-btn" onClick={handleSubmit}>
 Login with Facebook
 </button>

</div>

 <div  className="createAc-container" >

<Link to="/"> Create account here</Link>

 </div>

        </form>

      {!message == "" && (
        <div className="login-alert">
          {message}   
        </div>
      )}
        </div>
        </div>
    </div>


		</div>
	)
}



export default Login