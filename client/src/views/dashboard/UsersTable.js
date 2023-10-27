import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as XLSX from 'xlsx'; // Import all functions and objects from xlsx

import { DeleteUserController } from "../../controllers/DeleteUserController";
//importing session
import Usersession from '../dashboard/session/Usersession'
const HomeTable = ( props ) => {

 //initiate  to check user session
Usersession();

   const getResponseMsg = localStorage.getItem('message');
   const reponse_message_code = localStorage.getItem('reponse_message_code');
   // const [ message , setResponseMessage ] = useState("");
   // const [ messageCode , setmessageCode ] = useState("");
// handle delete , send id to controller
const handleDelete = async (userId) => {
    await DeleteUserController(userId);
    return;
    //alert('user is '+ userId);
};


//clear message after effect
 useEffect(() => {

    
setTimeout(()=>{
 localStorage.removeItem('message');
 localStorage.removeItem('reponse_message_code');


},6000)

   
  }, [reponse_message_code]);


 useEffect(() => {

    //handle notifications
 function closeNotificationSuccess() {
            const notification = document.getElementById('notification-success');
            notification.style.display = 'none';
 }

  function closeNotificationError() {
            const notification = document.getElementById('notification-error');
            notification.style.display = 'none';
        }

const sucess_close_btn =  document.getElementById('sucess_close_btn');

const error_close_btn =  document.getElementById('error_close_btn');


//add listeners sucess
if (sucess_close_btn) {
sucess_close_btn.addEventListener('click',closeNotificationSuccess);   
}


if (error_close_btn) {
  error_close_btn.addEventListener('click',closeNotificationError);
}


///remove listeners after 
return (()=>{

if (sucess_close_btn) {
sucess_close_btn.removeEventListener('click',closeNotificationSuccess);  
}


if (error_close_btn) {
  error_close_btn.removeEventListener('click',closeNotificationError);
}

});

 }, [reponse_message_code])


//delete modal
    const [  userId , setuserId ] = useState('');
    const tabledeleteUsersModal = document.getElementById("tabledeleteUsersModal");
    let usernamedelete = document.getElementById("username-delete");
      let temp_userId ;

    function handleuserIdBtn(event) {
      tabledeleteUsersModal.style.display = "block";
      temp_userId = event.target.getAttribute("datauserid");
      usernamedelete.textContent = event.target.getAttribute("datausername");
      setuserId(temp_userId);
      //alert(userId);
      //alert(usernamedelete);
    }

      function handleconfirmDelete(event) {

      tabledeleteUsersModal.style.display = "none";
      //alert('logged out');
      handleDelete(userId);
      //alert(userId);
    }

    function handlecancelDelete() {
      tabledeleteUsersModal.style.display = "none";
      //alert('cancelled');
    }

    //edit
     const handleuserEditBtn = async (event)=>{

      let editdatauserid = event.target.getAttribute("datauserid");
      let editusername = event.target.getAttribute("datausername");
      let edituserusermail = event.target.getAttribute("userusermail");
      let edituserprofile = event.target.getAttribute("userprofile");
      let editusertel = event.target.getAttribute("usertel");
      let editusereole = event.target.getAttribute("userrole");
      let editusercreated_at= event.target.getAttribute("usercreated_at");
      let edituserupdated_at= event.target.getAttribute("edituserupdated_at");

      localStorage.setItem('editdatauserid',editdatauserid);
      localStorage.setItem('editusername',editusername);
      localStorage.setItem('edituserusermail',edituserusermail);
      localStorage.setItem('edituserprofile',edituserprofile);
      localStorage.setItem('editusertel',editusertel);
      localStorage.setItem('editusereole',editusereole);
      localStorage.setItem('editusercreated_at',editusercreated_at);
      localStorage.setItem('edituserupdated_at',edituserupdated_at);
   

    }


  useEffect( () => {
      function SearchTable() {
      var input, filter, table, tr, td, i, j, txtValue, noResultsRow;
      input = document.getElementById("searchInput-table");
      filter = input.value.toUpperCase();
      table = document.getElementById("myTable");
      tr = table.getElementsByTagName("tr");
      noResultsRow = table.querySelector(".no-results"); // Get the "No results found" row

      // Initially hide the "No results found" row
      if (noResultsRow) {
        noResultsRow.style.display = "none";
      }

      var noResultsFound = true; // Assume no results found

      for (i = 0; i < tr.length; i++) {
        var displayRow = false; // Assume row should be hidden

        // Check if the current row is the header row
        if (tr[i].classList.contains("header")) {
          tr[i].style.display = "";
          continue; // Skip further processing for the header row
        }

        // Loop through all <td> elements in the current row
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
          txtValue = td[j].textContent || td[j].innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            displayRow = true; // If a match is found, show the row
            noResultsFound = false; // Match found, so set to false
            break; // No need to check the remaining <td> elements
          }
        }

        if (displayRow) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }

      // Display "No results found" if no matching rows are found
      if (noResultsFound && noResultsRow) {
        noResultsRow.style.display = "block"; // Show the "No results found" row
      }
    }

    const searchInputtable = document.getElementById("searchInput-table");

    searchInputtable.addEventListener("keyup", SearchTable);

   
    //remove effect
    return () => {
      searchInputtable.removeEventListener("keyup", SearchTable);
       };
  }, []);

  //consert table to xlsx data
  const exportToExcel = () => {
    const tableid = document.getElementById('myTable');
    const ws = XLSX.utils.table_to_sheet(tableid);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'USERS.xlsx');
  };

  return (
    <>
      <div className="title" id="top-button-table">
        <div className="tab-controll">
          <i className="uil uil-user"></i>
          <span className="text"> USERS ( {props.users.length})</span>
        </div>

        <div className="add-user">
          <Link to="/auth/dashboard/create-users" className="link-add-user">
            <i className="fa fa-user-plus" title="Add User"></i>
          </Link>
          <button onClick={exportToExcel} className="link-export-data" >
            <i className="fa fa-download" title="export data"></i> <span></span>  </button>
        </div>
      </div>

      <input
        type="text"
        id="searchInput-table"
         className="searchInput-table"
        placeholder="Search for names.."
        title="Type in anything..."
      />

      <div className="table-container">
        <table id="myTable">
          <thead>
            <tr className="header">
              <th data-sort="name">Name</th>
              <th data-sort="Mail">Mail</th>
              <th data-sort="Tel">Tel</th>
              <th data-sort="created_at">Created_at</th>
              <th data-sort="updated_at">Updated_at</th>

              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr className="no-results">
              <td colSpan="3">No results found</td>
            </tr>

         {

         props.users.length > 0 ? ( 
            props.users.map( ( user , index) => (
             <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.usermail}</td>
              <td>{user.tel}</td>
              <td>{user.created_at}</td>
              <td>{user.updated_at}</td>
              <td className="menu-icon">
                <span className="menu-icon-content">&#8942;</span>
                <div className="table-dropdown dropdown-1">
                  <Link to="/auth/dashboard/edit-user-profile">
                    <i className="fas fa-edit edit-icon" title="Edit"
                     datauserid={user.userID}
                     datausername={user.username}
                     onClick={handleuserEditBtn}
                     userusermail={user.usermail}
                     userprofile={user.profile}
                     usertel={user.tel}
                     userrole={user.role}
                     usercreated_at={user.created_at}
                     edituserupdated_at={user.updated_at}

                    ></i>
                  </Link>
                  <Link to="#">
                    <i
                      className="fas fa-trash delete-icon"
                      title="Delete"
                      id="userIdBtn"
                      datauserid={user.userID}
                      datausername={user.username}
                      onClick={handleuserIdBtn}
                    ></i>
                  </Link>
                </div>
              </td>
            </tr> ))

            ):(

            <tr className="">
              <td colSpan="3">Loading data...</td>
            </tr>

            )


}

          
        </tbody>
        </table>
      </div>

      <div className="action-modal" id="tabledeleteUsersModal">
        <div className="action-modal-content">
          <h2>Delete User</h2>
          <p>Are you sure you want to delete this user ? </p>
          <p className="username" id="username-delete"></p>

          <div className="action-buttons">
            <button id="confirmDelete" onClick={handleconfirmDelete} >Yes</button>
            <button id="cancelDelete"  onClick={handlecancelDelete} >Cancel</button>
          </div>
        </div>
      </div>

      { !getResponseMsg == ""  && reponse_message_code == 200 && ( 

<div class="notification-success" id="notification-success">
        <span  class="inner-notifications" >
        <div> {getResponseMsg}</div>
        <div class="close-button" id="sucess_close_btn" title="Close" >x</div> 
        </span>
 </div>
)

}


{ !getResponseMsg == "" && reponse_message_code == 501  &&  (
      <div class="notification-error" id="notification-error">
        <span  class="inner-notifications" >
        <div> {getResponseMsg}</div>
        <div class="close-button" id="error_close_btn" title="Close" >x</div> 
        </span>
    < /div>
)  }
    </>
  );
};

export default HomeTable;
