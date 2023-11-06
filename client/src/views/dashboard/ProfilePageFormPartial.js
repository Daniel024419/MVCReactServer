import { useState, useEffect } from "react";

import updateUserInfoController from "../../controllers/updateUserInfoController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const ProfilePageFormPartial = () => {
  //user data

  const usermail_session = localStorage.getItem("usermail");
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  const userID = localStorage.getItem("userID");
  const profile = localStorage.getItem("profile");
  const tel = localStorage.getItem("tel");
  const role = localStorage.getItem("role");
  const created_at = localStorage.getItem("created_at");
  const updated_at = localStorage.getItem("updated_at");
  let getResponseMsg = localStorage.getItem("message");
  let reponse_message_code = localStorage.getItem("reponse_message_code");
   

  const [formData, setformData] = useState({
    username: username,
    password: "",
    usermail: usermail_session,
    tel: tel,
    role: role,
    created_at: created_at,
    updated_at: updated_at,
    userID: userID,
  });

  const [isLoading, setIsLoading] = useState(false);

  //handles

  const handleChange = (event) => {
    setformData({ ...formData, [event.target.name]: event.target.value });
  };

  //handle submit
  const handleSubmit = (event) => {
    event.preventDefault();

    //check for empty input
    if (
      formData.username == "" ||
      // formData.password == ''||
      formData.usermail == "" ||
      formData.tel == "" ||
      formData.role == "" ||
      formData.created_at == "" ||
      formData.updated_at == ""
    ) {
      alert("all input are required..");
    } else {
      setIsLoading(true);
      //send data to controller when auth..
      updateUserInfoController(formData);

      //simulate the loader to hide
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
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

      }

      localStorage.removeItem("message");
      localStorage.removeItem("reponse_message_code");
    }

    function closeNotificationError() {
      const notification = document.getElementById("notification-error");
       if (notification) {
      
      notification.style.display = "none";
      }
      localStorage.removeItem("message");
      localStorage.removeItem("reponse_message_code");
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

  if (sucess_close_btn) {
  closeNotificationSuccess();

}
if (error_close_btn) {

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
        className="form-control-container"
        enctype="multipart/form-data"
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
              type={tel}
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
              readOnly
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
              readOnly
            />
          </div>

          <div className="form-group">
            <label className="lbl-text">Updated_at:</label>
            <input
              type="text"
              className="input-text"
              value={formData.updated_at}
              onChange={handleChange}
              name="updated_at"
              readOnly
            />
          </div>
        </div>

        <button
          type="submit"
          title="login"
          className="submit-btn"
          onClick={handleSubmit}
        >
          {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Update"}
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
