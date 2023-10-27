import axios from "axios";
import {Api_connect_server} from '../APIs/Api_connect_server'


//pass param from view
const DeleteUserController = async ( userId ) => {
//alert("user to delete " + userId)

let api_connect;  
api_connect =  Api_connect_server();

let message;
//send respond to clear user session
api_connect.delete('/auth/delete-users/'+userId)
.then((response)=>{

if (response.data.statusCode===200) {
message = response.data.message;
localStorage.setItem('message', message);
localStorage.setItem('reponse_message_code', response.data.statusCode);
//alert(message);

}else if(response.data.statusCode===501){
message = response.data.message;
localStorage.setItem('message', message);
localStorage.setItem('reponse_message_code', response.data.statusCode);
//alert(message);
 }

})
.catch((error)=>{
//alert("user to delete " + userId)
//error 
	console.log(error);
	//alert('internal error/ delete users...');
message = error.data.message;
localStorage.setItem('message', message);
localStorage.setItem('reponse_message_code', error.data.statusCode);
})


	
}

export {DeleteUserController}