import React from 'react'

const PreviewArtisanForm = () => {

  const usermail = localStorage.getItem("artisanusermail");
  const username = localStorage.getItem("editusername");
  const password = localStorage.getItem("password");
  const userID = localStorage.getItem("editdatauserid");

  const work_days = localStorage.getItem("work_days");
  const last_seen = localStorage.getItem("last_seen");
  const artisanlocation = localStorage.getItem("artisanlocation");

  const profile = localStorage.getItem("edituserprofile");
  const tel = localStorage.getItem("artisanTel");
  const role = localStorage.getItem("artisanRole");
  const created_at = localStorage.getItem("artisancreated_at");
  const updated_at = localStorage.getItem("artisanupdated_at");
  const ready_for_work = localStorage.getItem("ready_for_work");
  
  return (
    <>
      <form
        action=""
        className="form-control-container"
        encType="multipart/form-data"
         
      >
        <div className="form-group-control">
          
          <div className="form-group">
            <label className="lbl-text">Username:</label>
            <input
              type="text"
              className="input-text"
              value={username}
              
              name="username"
            />
          </div>

          <div className="form-group">
            <label className="lbl-text">Mail:</label>
            <input
              type="email"
              className="input-text"
              value={usermail}
              
              name="usermail"
            />
          </div>

          <div className="form-group">
            <label className="lbl-text">Tel:</label>
            <input
              type={tel}
              className="input-text"
              value={tel}
              
              name="tel"
            />
          </div>

          <div className="form-group">
            <label className="lbl-text">Work Days:</label>
            <input
              type="text"
              className="input-text"
              value={work_days}
              
              name="work_days"
            />
          </div>

          <div className="form-group">
            <label className="lbl-text">Role:</label>
            <input
              type="text"
              className="input-text"
              value={role}
              
              readOnly
              name="role"
            />
          </div>

            <div className="form-group">
            <label className="lbl-text">Location:</label>
            <input
              type="text"
              className="input-text"
              value={artisanlocation}
              
              readOnly
              name="artisanlocation"
            />
          </div>


          <div className="form-group">
            <label className="lbl-text">Availability:</label>
            <input
              type="text"
              className="input-text"
              value={ready_for_work}
              
              readOnly
              name="ready_for_work"
            />
          </div>
          <div className="form-group">
            <label className="lbl-text">Created_at:</label>
            <input
              type="date"
              className="input-text"
              value={created_at}
              
              name="created_at"
              readOnly
            />
          </div>

          <div className="form-group">
            <label className="lbl-text">Updated_at:</label>
            <input
              type="text"
              className="input-text"
              value={updated_at}
              
              name="updated_at"
              readOnly
            />
          </div>
        </div>

        
      </form>
    </>
  );
}

export default PreviewArtisanForm