//includes
import Topnav from '../dashboard/includes/TopNav'
import Footer from '../dashboard/includes/Footer'
// importing components
import { useEffect ,useState} from 'react'

import SideBar from '../dashboard/includes/SideBar'
import UsersOverview from '../dashboard/UsersOverview'

import UsersTable from '../dashboard/UsersTable'
//importing session
//importing session
import Usersession from '../dashboard/session/Usersession'
import { Api_connect_server } from "../../APIs/Api_connect_server";

const UsersPage = () => {
const api_connect = Api_connect_server();
const [ users , setUsers]=useState([]);

//initiate  to check user session
Usersession();


 
// Fetch the image from the server
api_connect.get('/auth/fetch-users')
  .then((response) => {
const statusCode = response.data.statusCode;

    if (response.status === 200) { 
     // Check the status code for success (200 OK)
      setUsers(response.data);
      // console.log(response.data)

     } else if (statusCode===404) {
      setUsers([]);
      //console.log("no user found")
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
    <div className="UsersOverview">
        <UsersOverview />
 </div>

<div className="activity">
  <UsersTable users={users} />
</div>

       </div>


</section>
		
< Footer />
</div>


		    );
}

export default UsersPage