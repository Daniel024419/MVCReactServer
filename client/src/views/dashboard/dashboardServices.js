//includes
import Topnav from '../dashboard/includes/TopNav'
import Footer from '../dashboard/includes/Footer'
// importing components
import { useEffect ,useState} from 'react'

import SideBar from '../dashboard/includes/SideBar'
import ArtisansOverview from '../dashboard/ArtisansOverview'

import ArtisansTable from '../dashboard/ArtisansTable'
import Usersession from '../dashboard/session/Usersession'
import { Api_connect_server } from "../../APIs/Api_connect_server";
const DashboardServices = () => {

const api_connect = Api_connect_server();
const [ artisans , setArtisans]=useState([]);

//initiate  to check user session
Usersession();


// Fetch the image from the server
api_connect.get('/auth/fetch-artisans')
  .then((response) => {
const statusCode = response.data.statusCode;

    if (response.status === 200) { 
     // Check the status code for success (200 OK)
      setArtisans(response.data);

     } else if (statusCode===404) {
      setArtisans([]);
    }
  })
  .catch((error) => {
    console.error('Error fetching users:', error);
  });

  
		return (
		<div className="dashboard-body">	

      <SideBar />
      
    <section className="dashboard">

	<Topnav />

    <div className="dash-content">

    {   /*over view*/ }
    <div className="ArtisansOverview">
        <ArtisansOverview />
 </div>

<div className="activity">
  <ArtisansTable artisans={artisans} />
</div>

       </div>


</section>
		
< Footer />
</div>


	)
}

export default DashboardServices