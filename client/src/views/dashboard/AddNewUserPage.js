import { Link } from "react-router-dom";
//includes
import Topnav from "../dashboard/includes/TopNav";
import Footer from "../dashboard/includes/Footer";
// importing components

import SideBar from "../dashboard/includes/SideBar";

import Overview from "../dashboard/Overview";

import AddNewUserPageFormPartial from "../dashboard/AddNewUserPageFormPartial";
import "../../css/profile.css";
import { useEffect, useState } from "react";

//import UploadUserProfileController

import UploadUserProfileController from "../../controllers/UploadNewUserController";

import { Api_connect_server } from "../../APIs/Api_connect_server";
//importing session
import Usersession from "../dashboard/session/Usersession";

//home function
const AddNewUserPage = () => {
  const api_connect = Api_connect_server();
  //initiate  to check user session
  Usersession();

//
    const username_new_user = localStorage.getItem("username_new_user");

  //checking user authentication
  let isAuthenticated = localStorage.getItem("isAuthenticated");

  const [dragOver, setDragOver] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleDropPreview = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const file_name = e.dataTransfer.files[0].name;

    //alert(file_name);

    //if true, send file to controller
    if (file) {
       setSelectedImage(URL.createObjectURL(file));
      //update user profile with uploaded

      setDragOver(false);

      UploadUserProfileController(file);
    }
  };


  const handleFileChange = (file) => {
    // const file = e.target.files[0];
    // const file_name = e.target.files[0].name;
    if (file !== null) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);

      // If you want to upload the image to the server, call handleUpload
      //UploadUserProfileController(file);
    }
  };

  //fetch user profile
  //const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    // Fetch the image from the server
    // api_connect
    //   .get("/fetch-user-profile/" + profile, { responseType: "blob" })
    //   .then((response) => {
    //     if (response.status === 200) {
    //       // Check the status code for success (200 OK)
    //       return response.data; // Use response.data for Axios, not response.blob()
    //     } else {
    //       throw new Error("Network response was not ok");
    //     }
    //   })
    //   .then((imageData) => {
    //     const src = URL.createObjectURL(new Blob([imageData]));
    //     setImageSrc(src);
    //   })
    //   .catch((error) => {
    //     //console.error("Error fetching image:", error);
    //   });


  }, []);
//  }, [imageSrc, profile, api_connect]);

  return (
    <div className="dashboard-body">
      <SideBar />

      <section className="dashboard">
        <Topnav />

        <div className="dash-content">
          <div className="profile-container">
            <span className="title-top">
              <i className="fas fa-tachometer"></i> Dashbaord >
              <i className="fas fa-user-plus"></i> Add New User
            </span>

            <div className="container-left">
              <h1 style={{ textTransform: "upperCase" }}>
                {username_new_user} 
              </h1>

              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="userprofil-edit"
                />
              ) : (
                <img
                  src={"../../uploads/user.png"}
                   
                  alt="default gif"
                  className="userprofil-edit"
                />
              )}

            </div>

            <div className="container-right">
              <AddNewUserPageFormPartial onFileChange={handleFileChange} />
            </div>
          </div>
        </div>

      </section>

      <Footer />
    </div>
  );
};

export default AddNewUserPage;
