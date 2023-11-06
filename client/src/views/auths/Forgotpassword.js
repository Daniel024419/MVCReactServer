import "../../css/forgotpass.css";
import {   Link} from 'react-router-dom';
import  VerificationController  from '../../controllers/VerificationController';
import  ForgotPasswordController  from '../../controllers/ForgotPasswordController';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState} from 'react'

const Forgotpassword = () => {
const [usermailorTel, setusermailorTel] = useState("");
 const [isLoading, setIsLoading] = useState(false);
 let message = localStorage.getItem('message');
 let reponse_message_code = localStorage.getItem("reponse_message_code") || 404;
 let user_response_type = localStorage.getItem("user_response_type") || 'invalid_user';
 //single_use_code_suc
 let single_use_code_suc = localStorage.getItem("single_use_code_suc") || '';
 let password_update_success = localStorage.getItem('password_update_success');

//new password
 const [password, setPassword] = useState("");
 const [repassword, setrePassword] = useState("");

// signle use code
const [useSingleCode, setuseSingleCode] = useState("");
const [error, seterrorState] = useState(false);
const [ReqtimeCount, setReqtimeCount] = useState(0)

const [suc_verified, setverified_suc] = useState(false);

//phone number/mail validation
const phoneRegex=/^\d{10}$/;
const mailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

//validate password
const numberRegex=/^[0-9]+$/;
const handleMailOrTelChange = (event)=>{
event.preventDefault();

setusermailorTel(event.target.value);
localStorage.removeItem('message');

}


const handleChangeSingleUseCode = (event)=>{
setuseSingleCode(event.target.value);

}


// localStorage.setItem("reponse_message_code",'');
// localStorage.setItem("user_response_type",'');
// localStorage.setItem("single_use_code_suc",'')



//cancel forgot session
const handleCancelSingleUseCode = (event)=>{



localStorage.setItem("reponse_message_code",'');
localStorage.setItem("user_response_type",'');
localStorage.setItem("single_use_code_suc",'')
localStorage.setItem('message','');

window.location.reload();
}


const handleMailOrTelSubmit=(event)=>{

event.preventDefault();
//set loading
setIsLoading(true);


if(usermailorTel==''){
//alert('Usermail is required..');

setTimeout(() => {

localStorage.setItem('message','Usermail or telephone is required...');
seterrorState(true);	

 setIsLoading(false);

}, 2000);

}else{

if(phoneRegex.test(usermailorTel) || mailRegex.test(usermailorTel)){


if(localStorage.getItem('req_count') < 2){
//send username to controll
VerificationController(usermailorTel);
localStorage.setItem('usermailorTel',usermailorTel)

setTimeout(() => {
 setIsLoading(false);
}, 5000);

setReqtimeCount(ReqtimeCount+1);
localStorage.setItem('req_count',ReqtimeCount);

}else{

setIsLoading(false);
seterrorState(true);	
localStorage.setItem('message','You have to wait till 20 secs before trying again');

setTimeout(() => {

localStorage.setItem('req_count',0);
localStorage.setItem('message','You can try again now');
seterrorState(false);	

}, 20000);

}

}


else{
//alert('invalid mail or telephone number..');	
setTimeout(() => {
localStorage.setItem('message','invalid mail or telephone number..');
setIsLoading(false);
seterrorState(true);	

}, 2000);
}}}




//check single use code

const handleSubmitSingleUseCode=(event)=>{

event.preventDefault();
//set loading
setIsLoading(true);

if(useSingleCode==''){
//alert('Usermail is required..');

//reset req count
setReqtimeCount(0);

}else{

//compare single use code
if(numberRegex.test(useSingleCode) && useSingleCode == single_use_code_suc ){
//send username to controll
setTimeout(() => {
setIsLoading(false);
setverified_suc(true);
seterrorState(false);

//alert(''+localStorage.getItem('suc_verified'));
localStorage.setItem('message','Single-use code verified,You can change ur password now');

}, 2000);

}else{
//alert('invalid mail or telephone number..');
setTimeout(() => {
seterrorState(true);	
localStorage.setItem('message','invalid single use code,Try again..');

setIsLoading(false);

}, 2000);
}}}



//handle password change
const handlePasswordChange=(event)=>{

//update password state with curent val
setPassword(event.target.value);
}

const handleRePasswordChange=(event)=>{

//update passord state with current value
setrePassword(event.target.value);
}


//send password to conntroller for update
const handleSubmitPassword = (event)=>{

event.preventDefault();
//set loading
setIsLoading(true);
if(password =='' || repassword==''){

seterrorState(true);
setTimeout(() => {
localStorage.setItem('message','Both password are required..');

setIsLoading(false);

}, 1000);

}
else{

if(password === repassword || repassword === password){



//lower cases
var lowerCaseLetters = /[a-z]/g;
// Validate capital letters
var upperCaseLetters = /[A-Z]/g;
if (password.match(lowerCaseLetters) && password.match(upperCaseLetters) )  
{


//alert('password good all..');
//send password and userid to controll
ForgotPasswordController(password,localStorage.getItem('userID'));
setTimeout(() => {

setIsLoading(false);

}, 6000);
}else{

seterrorState(true);
setTimeout(() => {
localStorage.setItem('message','Strong password is required..');
setIsLoading(false);

}, 1000);	
}




}else{

seterrorState(true);
setTimeout(() => {
localStorage.setItem('message','Both passwords must be the same..');
setIsLoading(false);

}, 1000);

}}

}





 // Use useEffect to clear the message in localStorage on component load
  useEffect(() => {
    localStorage.removeItem('message');
  }, []);

return (

<div className="forget-password-form-container">

{ user_response_type == '' || 'invalid_user'  && reponse_message_code == 404  && suc_verified == false &&  (


		
<form  onSubmit={handleMailOrTelSubmit} className="forget-password-form">
       
{!message == "" && (
<span  className="banner">
<p className="error-message" >{message}</p>
</span>
)}


      <h2>Account Recovery</h2>
        <div className="forget-password-form-controll" >

       	<input type="text" 
		name="usernmail" 
		value={usermailorTel}
		id="usermail" 
		onChange={handleMailOrTelChange} 
		 className="usermail" 
		/> 	

        </div>


        <div className="forget-password-form-controll" >

 		<button type="submit"  className="submit-btn" onClick={handleMailOrTelSubmit}>
       {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Verify'}
       </button>	

        </div>



  <div className="login-tag">
  	<Link to="/login" className="href-link">Login here</Link>
  </div>

	</form>


)}

{ reponse_message_code == 200 && user_response_type == "valid_user" && suc_verified == false && (

<form  onSubmit={handleSubmitSingleUseCode} className="forget-password-form">
       
{!message == ""  && error == false && (
<span  className="banner-sucess" style={{backGround:'green'}}>
<p className="error-message" >{message}</p>
</span>
)}

{ !message == "" && error == true && (
<span  className="banner">
<p className="error-message" >{message}</p>
</span>
)}


      <h2> Single Use Code </h2>

        <div className="forget-password-form-controll" >

       	<input type="text" 
		name="usernmail" 
		value={useSingleCode}
		id="usermail" 
		onChange={handleChangeSingleUseCode} 
		className="usermail" 

		/> 	

        </div>

        
        <div className="forget-password-form-controll" >

 		<button type="submit"  className="submit-btn" onClick={handleSubmitSingleUseCode}>
       {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Verif Single-Use Code'}
       </button>	

        </div>



  <div className="login-tag">
  	<Link to="#" className="href-link" onClick={handleCancelSingleUseCode} >Cancel Session</Link>
  </div>

	</form>


)}


{ suc_verified == true && user_response_type == "valid_user" && (

<form  onSubmit={handleSubmitPassword} className="forget-password-form">

{ !message == "" && error == true   &&   (
<span  className="banner">
<p className="error-message" >{message}</p>
</span>
)}


      <h2>Change Account Password for {localStorage.getItem('usermailorTel')}</h2>

        <div className="forget-password-form-controll" >

       	<input type="text" 
		name="usernmail" 
		value={password}
		id="repassword" 
		onChange={handlePasswordChange} 
		className="usermail" 

		/> 	

        </div>


         <div className="forget-password-form-controll" >

       	<input type="text" 
		name="repassword" 
		value={repassword}
		id="repassword" 
		onChange={handleRePasswordChange} 
		className="usermail" 

		/> 	

        </div>

        
        <div className="forget-password-form-controll" >

 		<button type="submit"  className="submit-btn" onClick={handleSubmitPassword}>
       {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Update Password'}
       </button>	

        </div>



  <div className="login-tag">
  	<Link to="#" className="href-link" onClick={handleCancelSingleUseCode} >Cancel Session</Link>
  </div>

	</form>


)}



	</div>

	)
}

export default Forgotpassword
