import { Link} from 'react-router-dom';
import  {LogoutController}  from '../../../controllers/LogoutController';
import { useEffect ,useState} from 'react'
import {Api_connect_server} from '../../../APIs/Api_connect_server'

const TopNav = () => {
 const api_connect =  Api_connect_server();

   // handle logout

	const handleLogout = async () =>{
		await LogoutController();
		return;
	}


	useEffect(() => {
 
  // Get the logout button and logout modal
const logoutButton = document.getElementById("logoutButton");
const logoutModal = document.getElementById("logoutModal");
const cancelLogout = document.getElementById("cancelLogout");
const confirmLogout = document.getElementById("confirmLogout");


function handlelogoutButton() {
	logoutModal.style.display = "block";
}

// Show the logout modal when the logout button is clicked
logoutButton.addEventListener("click", handlelogoutButton);

function handleConfirmLogout(event) {
  logoutModal.style.display = "none";
  //alert('logged out');
  handleLogout();
}

// Handle logout when the "Yes" button is clicked
confirmLogout.addEventListener("click",handleConfirmLogout );

  function handleCancelLogout() {
  logoutModal.style.display = "none";	
  //alert('cancelled');
   }

 // Handle logout when the "Yes" button is clicked
cancelLogout.addEventListener("click",handleCancelLogout );

		return () => {
logoutButton.removeEventListener("click", handlelogoutButton);
cancelLogout.removeEventListener("click",handleCancelLogout );
confirmLogout.removeEventListener("click",handleConfirmLogout );

		};
	}, [])


  const username = localStorage.getItem('username');

  const profile = localStorage.getItem('profile');
 
  //fetch user profile
  const [imageSrc, setImageSrc] = useState('');
 
  useEffect(() => {
    // Fetch the image from the server
    api_connect.get('/auth/fetch-user-profile/' + profile, { responseType: "blob" })
  .then((response) => {
    if (response.status === 200) { // Check the status code for success (200 OK)
      return response.data; // Use response.data for Axios, not response.blob()
    } else {
      throw new Error('Network response was not ok');
    }
  })
  .then((imageData) => {
    const src = URL.createObjectURL(new Blob([imageData]));
    setImageSrc(src);
  })
  .catch((error) => {
    console.error('Error fetching image:', error);
  });

      //check


  }, [imageSrc ,profile,api_connect ]);



    return (
<>
       
                          
          <div className="top">
           <i className="uil uil-bars sidebar-toggle"></i>
        
      
        <div className="search-box">  


         <form id="login-form" action=""   >

        <i className="uil uil-search"></i>
        <input type="text" placeholder="Type anything.." id="searchInput"  />

        <span  className="submit-btn">
        <input type="submit" value="Search" className="subbtn" />
        </span>

        </form>

       </div>

    <div className="account-container">

  { imageSrc ? (  
    <img src={imageSrc} alt="" className="userprofile" />
 ):(

    <img src="../../uploads/Iphone-spinner-2.gif" alt="" className="userprofile" />

 )
  }

    <div className="account-dropdown">

      <div className="account-item"  id="username">
         {username}
      </div>
      <Link className="account-item" to="/auth/dashboard/profile">
        <i className="fas fa-user-circle"></i> Profile
      </Link>
      <Link className="account-item" to="#">
        <i className="fas fa-cog"></i> Settings
      </Link>

      <Link className="account-item" to="#" id="logoutButton" >
        <i className="fas fa-sign-out"></i> Logout
      </Link>


    </div>
  </div>

</div>
 
<div className="action-modal" id="logoutModal">
  <div className="action-modal-content">
    <h2>Logout</h2>
    <p>Are you sure you want to log out?</p>
    <div className="action-buttons">
      <button id="confirmLogout">Yes</button>
      <button id="cancelLogout">Cancel</button>
    </div>
  </div>
</div>

</>         
 
);
};
 
export default TopNav;
