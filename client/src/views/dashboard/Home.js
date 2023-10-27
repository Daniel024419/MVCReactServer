import { useNavigate, Link } from "react-router-dom";
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

      <Footer />
    </div>
  );
};

export default Home;
