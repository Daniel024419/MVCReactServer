
import {Api_connect_server} from '../APIs/Api_connect_server'
let Userdata = [];
let message;
let statusCode;
let token;
 // models/authuseCrendentials.js


const AuthenticateUserModel = async (userName, password) => {

let api_connect;  
api_connect =  Api_connect_server();

//make post request to databse
api_connect.post('/login/users',{ userName , password })
.then ( ( response ) =>{

message = response.data.message;
Userdata = response.data.userData;
statusCode = response.data.statusCode;
token = response.token;
//check for response
if (statusCode===200){
      //user found
      localStorage.setItem('token', token);
	    localStorage.setItem('message', message);
      localStorage.setItem('statusCode',statusCode);
      localStorage.setItem('usermail',Userdata.usermail);
      localStorage.setItem('password',Userdata.password);
      localStorage.setItem('username',Userdata.username);
      localStorage.setItem('userID',Userdata.userID);
      localStorage.setItem('profile',Userdata.profile);
      localStorage.setItem('tel',Userdata.tel);
      localStorage.setItem('role',Userdata.role);
      localStorage.setItem('created_at',Userdata.created_at);
      localStorage.setItem('updated_at',Userdata.updated_at);
      localStorage.setItem('isAuthenticated', true);

      
      console.log(Userdata.userID)

      window.location.href = '/auth/dashboard';

     //alert(message);
return true;

 }
else if (statusCode===404) {
//not found
message = response.data.message;
localStorage.setItem('message',message );
localStorage.setItem('isAuthenticated', false);
//alert(message);

return false;

 }
else if (statusCode===401) {
//not found
message = response.data.message;
localStorage.setItem('message',message );
localStorage.setItem('isAuthenticated', false);
//alert(message);

return false;

 }
})
.catch( ( error ) =>{

 console.log("cannot fetch user " +error);

});
  //end fetch
};

// Export the authenticateUser function or other relevant functions
export default { AuthenticateUserModel};
