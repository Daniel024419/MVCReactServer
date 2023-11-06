import axios from "axios";
import {Api_connect_server} from '../APIs/Api_connect_server'

let message;

//pass param from view
const DeleteUserController = async ( userID ) => {

let api_connect =  Api_connect_server();

//send respond to delete user 
api_connect.delete('/auth/delete-users/'+userID)
.then((response)=>{

if(response){
if (response.data.statusCode===200 ) {
message = response.data.message;
localStorage.setItem('message', message);
localStorage.setItem('reponse_message_code', response.data.statusCode);
//window.location.reload();

}else if(response.data.statusCode===501){
message = response.data.message;
localStorage.setItem('message', message);
localStorage.setItem('reponse_message_code', response.data.statusCode);
 //window.location.reload();

 }	
}


})
.catch((error)=>{
if(error){
message = error.data.message;
localStorage.setItem('message', message);
localStorage.setItem('reponse_message_code', error.data.statusCode);

}
})


	
}


const deleteArtisanController = async ( artisanId ) =>{

let api_connect =  Api_connect_server();

//send respond to delete artisan 
api_connect.delete('/auth/delete-artisan/'+artisanId)
.then((response)=>{

if(response){
if (response.data.statusCode===200 ) {
message = response.data.message;
localStorage.setItem('message', message);
localStorage.setItem('reponse_message_code', response.data.statusCode);
//window.location.reload();
}else if(response.data.statusCode===501){
message = response.data.message;
localStorage.setItem('message', message);
localStorage.setItem('reponse_message_code', response.data.statusCode);
//window.location.reload();

 }	
}


})
.catch((error)=>{
if(error){
message = error.data.message;
localStorage.setItem('message', message);
localStorage.setItem('reponse_message_code', error.data.statusCode);

}
})
}

export { DeleteUserController , deleteArtisanController}