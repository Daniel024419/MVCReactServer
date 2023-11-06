import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as XLSX from 'xlsx'; 

import { deleteArtisanController } from "../../controllers/DeleteController";
//importing session
import Usersession from '../dashboard/session/Usersession'
const ArtisansTable = ( props ) => {

 //initiate  to check user session
Usersession();

   const getResponseMsg = localStorage.getItem('message');
   const reponse_message_code = localStorage.getItem('reponse_message_code');
	// handle delete , send id to controller
const handleDelete = async (artisanId) => {
    await deleteArtisanController(artisanId);
    return;
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
    const [  artisanId , setartisanId ] = useState('');
    const tabledeleteUsersModal = document.getElementById("tabledeleteUsersModal");
    let usernamedelete = document.getElementById("username-delete");
      let temp_artisanId ;

    function handleartisanIdBtn(event) {
      tabledeleteUsersModal.style.display = "block";
      temp_artisanId = event.target.getAttribute("dataartisanId");
      usernamedelete.textContent = event.target.getAttribute("artisanUsername");
      setartisanId(temp_artisanId);
      //alert(artisanId);
      //alert(usernamedelete);
    }

      function handleconfirmDelete(event) {

      tabledeleteUsersModal.style.display = "none";
      //alert('logged out');
      handleDelete(artisanId);
      //alert(artisanId);
    }

    function handlecancelDelete() {
      tabledeleteUsersModal.style.display = "none";
      //alert('cancelled');
    }

    //edit
     const handleArtisanPrevBtn = async (event)=>{

      let previewArtisanId = event.target.getAttribute("dataartisanId");
      let artisanUsername = event.target.getAttribute("artisanUsername");
      let artisanusermail = event.target.getAttribute("userusermail");
      let artisanprofile = event.target.getAttribute("artisanprofile");
      let artisanTel = event.target.getAttribute("usertel");
      let work_exp= event.target.getAttribute("work_exp");
      let work_ref_1 = event.target.getAttribute("work_ref_1");
      let work_ref_2 = event.target.getAttribute("work_ref_2");

      let artisanlocation = event.target.getAttribute("artisanlocation");
      let last_seen = event.target.getAttribute("last_seen");
      let work_days = event.target.getAttribute("work_days_from") +'-'+ event.target.getAttribute("work_days_to");
      let ready_for_work = event.target.getAttribute('ready_for_work');
      let artisanExpt = event.target.getAttribute("artisanExpt");
      let artisanRole = event.target.getAttribute("artisanRole");
      let work_tel= event.target.getAttribute("work_tel");

      let artisanupdated_at= event.target.getAttribute("artisanupdated_at");

      localStorage.setItem('previewArtisanId',previewArtisanId);
      localStorage.setItem('artisanUsername',artisanUsername);
      localStorage.setItem('artisanusermail',artisanusermail);
      localStorage.setItem('artisanprofile',artisanprofile);
      localStorage.setItem('work_exp',work_exp);
      localStorage.setItem('work_ref_1',work_ref_1);
      localStorage.setItem('work_ref_2',work_ref_2);
      localStorage.setItem('work_tel',work_tel);

      localStorage.setItem('artisanlocation',artisanlocation);
      localStorage.setItem('last_seen',last_seen);
      localStorage.setItem('work_days',work_days);
      localStorage.setItem('ready_for_work',ready_for_work);

      localStorage.setItem('artisanTel',artisanTel);
      localStorage.setItem('artisanExpt',artisanExpt);
      localStorage.setItem('artisanRole',artisanRole);
      localStorage.setItem('artisanupdated_at',artisanupdated_at);

   

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
    XLSX.writeFile(wb, 'ARTISANS.xlsx');
  };
	return (
		    <>
      <div className="title" id="top-button-table">
        <div className="tab-controll">
          <i className="uil uil-user"></i>
          <span className="text"> ARTISANS ( { props.artisans ?  props.artisans.length : 0})</span>
        </div>

        <div className="add-user">
         
          <button onClick={exportToExcel} className="link-export-data" >
            <i className="fa fa-download" title="export data"></i> <span></span>  </button>
        </div>
      </div>

      <input
        type="text"
        id="searchInput-table"
         className="searchInput-table"
        placeholder="Search for anything.."
        title="Type in anything..."
      />

      <div className="table-container">
        <table id="myTable">
          <thead>
            <tr className="header">
              <th style={{width:'10px'}}></th>
              <th data-sort="name">Name</th>
              <th data-sort="expertise">Expertise</th>
              <th data-sort="location">Loc</th>
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

   props.artisans.length > 0 && props.artisans  ? ( 
            props.artisans.map( ( artisan , index) => (
<tr key={artisan._id}>
             {
              artisan.status==1 ?
              (
<td><div class="user-status online"></div>
       </td>
                ):(
<td><div class="user-status offline"></div> </td>
                )


             } 

              <td>{artisan.username}</td>
               <td>{artisan.expertise}</td>
              <td>{artisan.location}</td>
              <td>{artisan.usermail}</td>
              <td>{artisan.tel}</td>
              <td>{artisan.created_at}</td>
              <td>{artisan.updated_at}</td>
              <td className="menu-icon">
                <span className="menu-icon-content">&#8942;</span>
                <div className="table-dropdown dropdown-1">
                  <Link to="/auth/dashboard/preview-artisan">
                    <i className="fas fa-eye edit-icon" title="Preview"
                     dataartisanId={artisan.artisanId}
                     artisanUsername={artisan.username}
                     onClick={handleArtisanPrevBtn}
                     userusermail={artisan.usermail}
                     artisanprofile={artisan.profile}
                     usertel={artisan.tel}
                     work_days_from={artisan.work_days_from}
                     work_days_to={artisan.work_days_to}
                     ready_for_work={artisan.ready_for_work}
                     last_seen={artisan.last_seen}
                     artisanlocation={artisan.location}
                     artisanExpt={artisan.expertise}
                     artisanRole={artisan.role}
                     work_exp={artisan.work_exp}
                     work_ref_2={artisan.work_ref_2}
                     work_ref_1={artisan.work_ref_1}
                     work_tel={artisan.work_tel}
                     artisancreated_at={artisan.created_at}
                     artisanupdated_at={artisan.updated_at}

                    ></i>
                  </Link>
                  <Link to="#">
                    <i
                      className="fas fa-trash delete-icon"
                      title="Delete"
                      id="artisanIdBtn"
                      dataartisanId={artisan.artisanId}
                      artisanUsername={artisan.username}
                      onClick={handleartisanIdBtn}
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
          <p>Are you sure you want to delete this artisan ? </p>
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
	)
}

export default ArtisansTable