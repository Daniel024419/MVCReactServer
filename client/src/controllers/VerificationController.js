import {Api_connect_server} from '../APIs/Api_connect_server'

const CheckUserMailController = (usermailorTel) => {
let api_connect;  
api_connect =  Api_connect_server();
let message;


// alert(usermailorTel);

api_connect.post('/auth/user/verify-usermailorTel',{usermailorTel})
.then((response)=>{

if (response.data.statusCode===200) {
message = response.data.message;
const userData =response.data.userData;

localStorage.setItem('message', message);
localStorage.setItem('reponse_message_code', response.data.statusCode);
//alert(message);
localStorage.setItem('user_response_type','valid_user');
localStorage.setItem('userID',userData.userID);
localStorage.setItem('single_use_code_suc',response.data.single_use_code_suc)

}else if(response.data.statusCode===404){
message = response.data.message;
localStorage.setItem('message', message);
localStorage.setItem('reponse_message_code', response.data.statusCode);
localStorage.setItem('user_response_type','invalid_user');
//alert(message);
//window.location.reload();

 }

})
.catch( (error)=>{
console.log(error);
//alert('internal error/ verify usermailorTel...');
//alert('internal error..'+error);	
localStorage.setItem('message', "Please try again...");



})


}

export default CheckUserMailController 