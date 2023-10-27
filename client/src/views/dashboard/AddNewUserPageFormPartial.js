import { useState, useEffect } from "react";

import UploadNewUserController from "../../controllers/UploadNewUserController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const ProfilePageFormPartial = (props) => { 

   //user data
  const { onFileChange } = props;
  const created_by = localStorage.getItem("username");
  const userID = localStorage.getItem("userID");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);


  let getResponseMsg = localStorage.getItem("message");
  let reponse_message_code = localStorage.getItem("reponse_message_code");
 

  //get props

  const [dragOver, setDragOver] = useState(false);
  const [formData, setformData] = useState({
    userID:Math.random().toString(36).substr(2 ,50),
    profile: "",
    username: "",
    password: "",
    usermail: "",
    tel: "",
    role: "",
    created_at: "",
    updated_at: "",
    created_by: created_by,
  });
  //handles

  const handleChange = (event) => {
    //check input type
    if (event.target.type === "file") {
      setFile(event.target.files[0]);
    }

    setformData({ ...formData, [event.target.name]: event.target.value });
  };
  //check and pass file as props to parent

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDropPreview = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    onFileChange(file);
    setFile(file);
  };

 //send file to parenet props
  onFileChange(file);

  localStorage.setItem("username_new_user", formData.username);

  //handle submit
  const handleSubmit = (event) => {
    event.preventDefault();

    //check for empty input
    if (
      formData.username == "" ||
      formData.password == ''||
      formData.usermail == "" ||
      formData.tel == "" ||
      formData.role == "" ||
      formData.created_at == "" ||
      file == "" 
     ) {
      alert("all input are required..");
    } else {
      setIsLoading(true);
      //send data to controller when auth..
      //send drag file

      UploadNewUserController(formData , file);

 
      //simulate the loader to hide
        setTimeout(() => {
       setIsLoading(false);
      }, 9000);
    }

    //end if
  };


 //clear message after effect
  useEffect(() => {

//handle notifications
    function closeNotificationSuccess() {
      const notification = document.getElementById("notification-success");
      if (notification) {
      notification.style.display = "none";
      localStorage.removeItem("message");
      localStorage.removeItem("reponse_message_code");
   
      }
      }

    function closeNotificationError() {
      const notification = document.getElementById("notification-error");
      if (notification) {
          notification.style.display = "none";
      localStorage.removeItem("message");
      localStorage.removeItem("reponse_message_code");
   
      }
     }

    const sucess_close_btn = document.getElementById("sucess_close_btn");

    const error_close_btn = document.getElementById("error_close_btn");

    //add listeners sucess
    if (sucess_close_btn) {
      sucess_close_btn.addEventListener("click", closeNotificationSuccess);
    }

    if (error_close_btn) {
      error_close_btn.addEventListener("click", closeNotificationError);
    }

setTimeout(() => {

if (sucess_close_btn !=null) {
  closeNotificationSuccess();

}
if (error_close_btn !=null) {

  closeNotificationError();
}
}, 6000);


    ///remove listeners after
    return () => {
      if (sucess_close_btn) {
        sucess_close_btn.removeEventListener("click", closeNotificationSuccess);
      }

      if (error_close_btn) {
        error_close_btn.removeEventListener("click", closeNotificationError);
      }
    };



  }, [reponse_message_code]);



  return (
    <>
      <form
        action=""
        id="form-control-container"
        className="form-control-container"
        onSubmit={handleSubmit}
      >
       
        <div className="form-group-control">
          <input
            type="hidden"
            className="input-text"
            value={formData.userID}
            onChange={handleChange}
            name="userID"
          />
          <div className="form-group">
            <label className="lbl-text">Username:</label>
            <input
              type="text"
              className="input-text"
              value={formData.username}
              onChange={handleChange}
              name="username"
              id="username"
            />
          </div>

          <div className="form-group">
            <label className="lbl-text">Mail:</label>
            <input
              type="email"
              className="input-text"
              value={formData.usermail}
              onChange={handleChange}
              name="usermail"
            />
          </div>

          <div className="form-group">
            <label className="lbl-text">Tel:</label>
            <input
              type="tel"
              className="input-text"
              value={formData.tel}
              onChange={handleChange}
              name="tel"
            />
          </div>

          <div className="form-group">
            <label className="lbl-text">Password:</label>
            <input
              type="text"
              className="input-text"
              value={formData.password}
              onChange={handleChange}
              name="password"
            />
          </div>

          <div className="form-group">
            <label className="lbl-text">Role:</label>
            <input
              type="text"
              className="input-text"
              value={formData.role}
              onChange={handleChange}
              name="role"
            />
          </div>

          <div className="form-group">
            <label className="lbl-text">Created_at:</label>
            <input
              type="date"
              className="input-text"
              value={formData.created_at}
              onChange={handleChange}
              name="created_at"
            />
          </div>

          <div className="form-group">
            <label className="lbl-text">Created_By:</label>
            <input
              type="text"
              className="input-text"
              value={formData.created_by}
              onChange={handleChange}
              name="created_by"
              readOnly
            />
          </div>


        </div>

        <div
          onDrop={handleDropPreview}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          style={{
            border: dragOver ? "3px dashed #333" : "2px dashed #ccc",
          }}
          className="uploads-drop"
         >
          <input
            type="file"
            className="input-text-new-user"
            value={formData.profile}
            onChange={handleChange}
            name="file"
            id="profile"
            accepts="./image"
          />
          <p className="mobile-hide">or</p>
          <span className="mobile-hide"> Drag & Drop an Image </span>
        </div>

        <button
          type="submit"
          title="login"
          className="submit-btn"
          onClick={handleSubmit}
        >
          {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Save"}
        </button>
                {!getResponseMsg == "" && reponse_message_code == 200 && (
          <div className="notification-success" id="notification-success">
            <span className="inner-notifications">
              <div> {getResponseMsg}</div>
              <div className="close-button" id="sucess_close_btn" title="Close">
                x
              </div>
            </span>
          </div>
        )}

        {!getResponseMsg == "" && reponse_message_code == 501 && (
          <div className="notification-error" id="notification-error">
            <span className="inner-notifications">
              <div> {getResponseMsg}</div>
              <div className="close-button" id="error_close_btn" title="Close">
                x
              </div>
            </span>
          </div>
        )}
      </form>
    </>
  );
};

export default ProfilePageFormPartial;
