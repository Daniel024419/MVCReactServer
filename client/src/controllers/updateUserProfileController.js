import {Api_connect_server} from '../APIs/Api_connect_server'

const updateUserProfileController = async (file_data , userID) => {
 const api_connect =  Api_connect_server();

let message;
//send respond to update user profile
let Userdata;
let statusCode;
if (file_data) {
  // Send the file to the server using Axios
 const formData = new FormData();
 formData.append('file', file_data);
 formData.append('userID', userID);


api_connect.post('/auth/update/user-profile-picture', formData, 
	{headers: { 'Content-Type': 'multipart/form-data' },})

.then((response)=>{
 Userdata = response.data.userData;
 statusCode = response.data.statusCode;

if (statusCode===200) {
message = response.data.message;
localStorage.setItem('message', message);
localStorage.setItem('reponse_message_code', 200);
localStorage.setItem('profile',Userdata.profile);
console.log("file changed successfully..")	

}else if(statusCode===501){
message = response.data.message;
localStorage.setItem('message', message);
localStorage.setItem('reponse_message_code', 501);
console.log(message)
}

})
.catch((error)=>{

//error 
	console.log(file_data);
	//alert('internal error...can not update user profile',+error);
	console.log(error)
	localStorage.setItem('reponse_message_code', 501);
	localStorage.setItem('message', "Couldnt update Please, try again");
alert('error');


})

} 
}



export default updateUserProfileController