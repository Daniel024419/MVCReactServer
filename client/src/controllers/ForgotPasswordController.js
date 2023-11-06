import {Api_connect_server} from '../APIs/Api_connect_server'

const ForgotPasswordController = (password ,userID ) => {
let api_connect;  
api_connect =  Api_connect_server();
let message;


// alert(usermailorTel);

api_connect.post('/auth/user/update-forgot-password',{password , userID})
.then((response)=>{

if (response.data.statusCode===200) {
message = response.data.message;
localStorage.setItem('message', message);
localStorage.setItem('reponse_message_code', response.data.statusCode);

localStorage.setItem("reponse_message_code",'');
localStorage.setItem("user_response_type",'');
localStorage.setItem("single_use_code_suc",'')

//redirect to login after success..
window.location.href='/login';


}else if(response.data.statusCode===404){
message = response.data.message;
localStorage.setItem('message', message);
localStorage.setItem('reponse_message_code', response.data.statusCode);
localStorage.setItem('password_update_success',false);
//alert(message);

}

})
.catch( (error)=>{

console.error(error);
localStorage.setItem('message', "Please try updating password again...");
localStorage.setItem('reponse_message_code', 501);
localStorage.setItem('password_update_success',false);


})


}

export default ForgotPasswordController 