
const Usersession = async ( ) => {

 //checking user authentication
  let isAuthenticated =localStorage.getItem('isAuthenticated');

	if (isAuthenticated==="false") {
	window.location.href = '/login';
	}      
 
   }

 

export default  Usersession 