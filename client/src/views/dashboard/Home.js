 //includes
import Topnav from "../dashboard/includes/TopNav";
import Footer from "../dashboard/includes/Footer";

// importing components

import SideBar from "../dashboard/includes/SideBar";

import Overview from "../dashboard/Overview";

import HomeTable from "../dashboard/HomeTable";
import "../../css/dashboard.css";
import { useEffect, useState } from "react";

//importing session
import Usersession from "../dashboard/session/Usersession";

//home function
const Home = () => {

  //initiate  to check user session
  Usersession();
 const getResponseMsg = localStorage.getItem('message');
  const reponse_message_code = localStorage.getItem('reponse_message_code');
  
//clear message after effect
 useEffect(() => {

    
setTimeout(()=>{
 localStorage.removeItem('message');
 localStorage.removeItem('reponse_message_code');


},6000)

   
  }, [reponse_message_code]);
  return (
    <div className="dashboard-body">
      <SideBar />

      <section className="dashboard">
        <Topnav />

        <div className="dash-content">
          {/*over view*/}
          <div className="overview">
            <Overview />
          </div>

          <div className="activity">
            <HomeTable />
          </div>
        </div>
      </section>
{ !getResponseMsg == ""  && reponse_message_code == 200 && ( 

<div class="notification-success" id="notification-success">
        <span  class="inner-notifications" >
        <div> {getResponseMsg}</div>
        <div class="close-button" id="sucess_close_btn" title="Close" >x</div> 
        </span>
 </div>
)

}
      <Footer />
    </div>
  );
};

export default Home;
