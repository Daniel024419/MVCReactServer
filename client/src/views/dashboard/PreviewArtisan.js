import { Link} from 'react-router-dom';
//includes
import Topnav from '../dashboard/includes/TopNav'
import Footer from '../dashboard/includes/Footer'

import SideBar from '../dashboard/includes/SideBar'
import PreviewArtisanForm from '../dashboard/PreviewArtisanForm'
import { useEffect ,useState} from 'react'
import EditUserProfileController from '../../controllers/EditUserProfileController'
 
import {Api_connect_server} from '../../APIs/Api_connect_server'
//importing session
import Usersession from '../dashboard/session/Usersession'



const PreviewArtisan = () => {

 
const api_connect =  Api_connect_server();
 //initiate  to check user session
 Usersession();

  const username = localStorage.getItem('artisanUsername');
  const profile = localStorage.getItem('artisanprofile');
  const artisanExpt = localStorage.getItem('artisanExpt');
  const work_exp = localStorage.getItem('work_exp');
  const work_ref_1 = localStorage.getItem('work_ref_1') || 'none';
  const work_ref_2 = localStorage.getItem('work_ref_2') || 'none';
  const work_tel = localStorage.getItem('work_tel');

  const role = localStorage.getItem("artisanRole");


  //fetch user profile
  const [imageSrc, setImageSrc] = useState('');
 
  useEffect(() => {
    // Fetch the image from the server
    api_connect.get('/auth/fetch-user-profile/' + profile, { responseType: "blob" })
  .then((response) => {
    if (response.status === 200) { // Check the status code for success (200 OK)
      return response.data;
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


  }, [imageSrc ,profile,api_connect ]);



    
 	return (

<div className="dashboard-body">	

      <SideBar />
      
<section className="dashboard">

		  <Topnav />


      <div className="dash-content">

      

      {   /*over view*/ }
    
    
    <div className="profile-container">
    <span className="title-top"><i className="fas fa-tachometer"></i> Dashbaord > <i className="fas fa-user"></i>  Edit User ( {username} )</span>

     <div className="container-left">
        
        <h1  style={{textTransform:'upperCase'}}   >{role}</h1>

       {  
         imageSrc ? (
        <img src={imageSrc} alt="fetched" className="userprofil-edit" />

        	):(
        <img src={"../../uploads/Iphone-spinner-2.gif"} style={{width:'100px',height:'100px'}} alt="default gif" className="userprofil-edit" />

       
          )
       }
        

 
 <div className="artisan-info">
 <center>Work Info</center>
 <ul>
 <li><span className="info-title" >Profession :</span>  {artisanExpt}</li>
 <li><span className="info-title" >Experience :</span> {work_exp} </li>
 <li><span className="info-title" >Work Tel :</span> {work_tel} </li>
 <li><span className="info-title" >Ref 2 :</span> {work_ref_2} </li>
 <li><span className="info-title" >Ref 2 :</span> {work_ref_2} </li>

 </ul>


 </div>

     </div>
     
     <div className="container-right">
     <PreviewArtisanForm/>
     </div>

     </div>


      </div>



</section>
		

< Footer />
</div>


		    );
}

export default PreviewArtisan