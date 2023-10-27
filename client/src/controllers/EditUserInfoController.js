
import {Api_connect_server} from '../APIs/Api_connect_server'
let Userdata = [];
let message;
let statusCode;
let token;
 // models/authuseCrendentials.js


const EditUserInfoController = (formData) => {

let api_connect;  
api_connect =  Api_connect_server();

//alert("data reciveved at controller" + formData.userID);

//make post request to databse
api_connect.post('/auth/edit/edit-user-details',{ formData } )
.then ( ( response ) =>{

message = response.data.message;
Userdata = response.data.userData;
statusCode = response.data.statusCode;
 //check for response
if (statusCode===200){
      //user found

      localStorage.setItem('edituserusermail',Userdata.usermail);
      localStorage.setItem('editusername',Userdata.username);
      localStorage.setItem('edituserprofile',Userdata.profile);
      localStorage.setItem('editusertel',Userdata.tel);
      localStorage.setItem('editusereole',Userdata.role);
      localStorage.setItem('editusercreated_at',Userdata.created_at);
      localStorage.setItem('editupdated_at',Userdata.updated_at);

      
     //console.log(Userdata.userID)
     window.location.reload();
     localStorage.setItem('reponse_message_code', 200); 
     localStorage.setItem('message', message);

//alert(message);
return true;

 }
else if (statusCode===501) {
//not found
message = response.data.message;
 //alert(message);
window.location.reload();
localStorage.setItem('reponse_message_code', 501);
localStorage.setItem('message',message );

return false;

 }

})
.catch( ( error ) =>{

 console.log("update response error user " +error);

});
  //end fetch
};

// Export the authenticateUser function or other relevant functions
export default EditUserInfoController;
