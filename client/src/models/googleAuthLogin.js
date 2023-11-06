 import { useEffect, useState } from "react";

import {jwtDecode} from 'jwt-decode';

const GoogleAuthLogin = () => {


const [userDataState, setuserDataState] = useState([])
const [statusCode, setstatusCode] = useState("")
const [token, settoken] = useState("")
const [message, setmessage] = useState("")

//fetch data_token
useEffect(() => {
    // Extract the token from the URL's query parameters
    const searchParams = new URLSearchParams(window.location.search);
    const data_token = searchParams.get('data_token');

if (data_token) {

  

//decode data_token
const decodedToken = jwtDecode(data_token);

setuserDataState(decodedToken.userData);
setmessage(decodedToken.message);
settoken(decodedToken.token);
setstatusCode(decodedToken.statusCode);
    }
  }, []);


try{
 //check for response
if (statusCode===200){
      //user found
      localStorage.setItem('token', token);
      localStorage.setItem('message', message);
      localStorage.setItem('statusCode',statusCode);
      localStorage.setItem('usermail',userDataState.usermail);
      localStorage.setItem('username',userDataState.username);
      localStorage.setItem('userID',userDataState.userID);
      localStorage.setItem('profile',userDataState.profile);
      localStorage.setItem('tel',userDataState.tel);
      localStorage.setItem('role',userDataState.role);
      localStorage.setItem('created_at',userDataState.created_at);
      localStorage.setItem('updated_at',userDataState.updated_at);
      localStorage.setItem('isAuthenticated', true);
  //redirect after login
  window.location.href = '/auth/dashboard';


return true;

 }
else if (statusCode===404) {
//not found
localStorage.setItem('message',message );
localStorage.setItem('isAuthenticated', false);
//alert(message);

return false;

 }
else if (statusCode===401) {
//not found
 localStorage.setItem('message',message );
localStorage.setItem('isAuthenticated', false);
//alert(message);

return false;

 }
}catch( error ){

console.log("cannot fetch user " +error);
localStorage.setItem('message',"Please , Try again" );
localStorage.setItem('isAuthenticated', false);
};
  //end fetch
}

export default GoogleAuthLogin