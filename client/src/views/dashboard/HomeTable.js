import { Link} from 'react-router-dom';
import { useEffect, useState} from 'react'

import  {DeleteUserController}  from '../../controllers/DeleteUserController';

const HomeTable = () => {

// handle delete , send id to controller

	const handleDelete = async ( userId ) =>{
		await DeleteUserController(userId);
		return;
		//alert('user is '+ userId);
	}


useEffect(() => {

function  SearchTable () {

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


const searchInputtable  = document.getElementById("searchInput-table");

searchInputtable.addEventListener("keyup", SearchTable );



//delete users
// Get the logout button and logout modal
const userIdButton = document.querySelectorAll("#userIdButton");
const deleteModal = document.getElementById("deleteModal");
const cancelDelete = document.getElementById("cancelDelete");
const confirmDelete = document.getElementById("confirmDelete");
let usernamedelete =document.getElementById("username-delete");

let userId;
function handleuserIdButton(event) {
	deleteModal.style.display = "block";
	userId = event.target.getAttribute("datauserid");
	usernamedelete.textContent = event.target.getAttribute("datausername");
	 //alert(userId);
	 //alert(usernamedelete);
}

//add function each


userIdButton.forEach(function(Btnelem) {
Btnelem.addEventListener("click", handleuserIdButton);
});
// Show the logout modal when the logout button is clicked
//userIdButton.addEventListener("click", handleuserIdButton);

function handleconfirmDelete(event) {
  deleteModal.style.display = "none";
  //alert('logged out');
   handleDelete(userId);
}

// Handle logout when the "Yes" button is clicked
confirmDelete.addEventListener("click",handleconfirmDelete );

  function handlecancelDelete() {
  deleteModal.style.display = "none";	
  //alert('cancelled');
   }

 // Handle logout when the "Yes" button is clicked
cancelDelete.addEventListener("click",handlecancelDelete );




//remove effect
	return () => {
searchInputtable.removeEventListener("keyup", SearchTable );
//userIdButton.removeEventListener("click", handleuserIdButton);
userIdButton.forEach(function(Btnelem) {
Btnelem.removeEventListener("click", handleuserIdButton);
});
cancelDelete.removeEventListener("click",handlecancelDelete );
confirmDelete.removeEventListener("click",handleconfirmDelete );

     };
}, [])


	return (

 
<>

 <div className="title">
      <i className="uil uil-clock-three"></i>
        <span className="text">Recent Activity</span>
</div>


<input type="text" id="searchInput-table" className="searchInput-table" placeholder="Search for names.." title="Type in anything..." />

<div className="table-container">
<table id="myTable">

<thead>
    <tr className="header">
        <th data-sort="name">Name</th>
        <th data-sort="country">Country</th>

        <th>A</th>
    </tr>
</thead>


<tbody >
 <tr className="no-results">
    <td colSpan="3">No results found</td>          
 </tr>

 <tr>
  <td>Alfreds Futterkiste</td>
  <td>Kofi</td>
  <td className="menu-icon">
    <span className="menu-icon-content">&#8942;</span>
    <div className="table-dropdown dropdown-1">
      <Link to="#"><i className="fas fa-edit edit-icon" title="Edit"></i></Link>
      <Link to="#"><i className="fas fa-trash delete-icon" title="Delete" id="userIdButton" datauserid="999"  datausername="Alfreds Futterkiste" ></i></Link>
    </div>
  </td>
</tr>
<tr>
  <td>Berglunds snabbkop</td>
  <td>Sweden</td>
  <td className="menu-icon">
    <span className="menu-icon-content">&#8942;</span>
    <div className="table-dropdown dropdown-2">
      <Link to="#"><i className="fas fa-edit edit-icon" title="Edit"></i></Link>
      <Link to="#"><i className="fas fa-trash delete-icon" title="Delete" id="userIdButton" datauserid="5555" datausername="Berglunds snabbkop"  ></i></Link>
    </div>
  </td>
</tr>

<tr>
  <td>Berglunds snabbkop</td>
  <td>Sweden</td>
  <td className="menu-icon">
    <span className="menu-icon-content">&#8942;</span>
    <div className="table-dropdown dropdown-2">
      <Link to="#"><i className="fas fa-edit edit-icon" title="Edit"></i></Link>
      <Link to="#"><i className="fas fa-trash delete-icon" title="Delete" id="userIdButton" datauserid="6666" datausername="Berglunds snabbkop"   ></i></Link>
    </div>
  </td>
</tr>
<tr>
  <td>Berglunds snabbkop</td>
  <td>Sweden</td>
  <td className="menu-icon">
    <span className="menu-icon-content">&#8942;</span>
    <div className="table-dropdown dropdown-2">
      <Link to="#"><i className="fas fa-edit edit-icon" title="Edit"></i></Link>
      <Link to="#"><i className="fas fa-trash delete-icon" title="Delete"></i></Link>
    </div>
  </td>
</tr>
<tr>
  <td>Berglunds snabbkop</td>
  <td>Sweden</td>
  <td className="menu-icon">
    <span className="menu-icon-content">&#8942;</span>
    <div className="table-dropdown dropdown-2">
      <Link to="#"><i className="fas fa-edit edit-icon" title="Edit"></i></Link>
      <Link to="#"><i className="fas fa-trash delete-icon" title="Delete" id="userIdButton" datauserid="3333"  ></i></Link>
    </div>
  </td>
</tr>
<tr>
  <td>Berglunds snabbkop</td>
  <td>Sweden</td>
  <td className="menu-icon">
    <span className="menu-icon-content">&#8942;</span>
    <div className="table-dropdown dropdown-2">
      <Link to="#"><i className="fas fa-edit edit-icon" title="Edit"></i></Link>
      <Link to="#"><i className="fas fa-trash delete-icon" title="Delete" id="userIdButton" datauserid="444"  ></i></Link>
    </div>
  </td>
</tr>
<tr>
  <td>Berglunds snabbkop</td>
  <td>Sweden</td>
  <td className="menu-icon">
    <span className="menu-icon-content">&#8942;</span>
    <div className="table-dropdown dropdown-2">
      <Link to="#"><i className="fas fa-edit edit-icon" title="Edit"></i></Link>
      <Link to="#"><i className="fas fa-trash delete-icon" title="Delete"></i></Link>
    </div>
  </td>
</tr><tr>
  <td>Berglunds snabbkop</td>
  <td>Sweden</td>
  <td className="menu-icon">
    <span className="menu-icon-content">&#8942;</span>
    <div className="table-dropdown dropdown-2">
      <Link to="#"><i className="fas fa-edit edit-icon" title="Edit"></i></Link>
      <Link to="#"><i className="fas fa-trash delete-icon" title="Delete"></i></Link>
    </div>
  </td>
</tr><tr>
  <td>Berglunds snabbkop</td>
  <td>Sweden</td>
  <td className="menu-icon">
    <span className="menu-icon-content">&#8942;</span>
    <div className="table-dropdown dropdown-2">
      <Link to="#"><i className="fas fa-edit edit-icon" title="Edit"></i></Link>
      <Link to="#"><i className="fas fa-trash delete-icon" title="Delete"></i></Link>
    </div>
  </td>
</tr><tr>
  <td>Berglunds snabbkop</td>
  <td>Sweden</td>
  <td className="menu-icon">
    <span className="menu-icon-content">&#8942;</span>
    <div className="table-dropdown dropdown-2">
      <Link to="#"><i className="fas fa-edit edit-icon" title="Edit"></i></Link>
      <Link to="#"><i className="fas fa-trash delete-icon" title="Delete"></i></Link>
    </div>
  </td>
</tr><tr>
  <td>Berglunds snabbkop</td>
  <td>Sweden</td>
  <td className="menu-icon">
    <span className="menu-icon-content">&#8942;</span>
    <div className="table-dropdown dropdown-2">
      <Link to="#"><i className="fas fa-edit edit-icon" title="Edit"></i></Link>
      <Link to="#"><i className="fas fa-trash delete-icon" title="Delete"></i></Link>
    </div>
  </td>
</tr><tr>
  <td>Berglunds snabbkop</td>
  <td>Sweden</td>
  <td className="menu-icon">
    <span className="menu-icon-content">&#8942;</span>
    <div className="table-dropdown dropdown-2">
      <Link to="#"><i className="fas fa-edit edit-icon" title="Edit"></i></Link>
      <Link to="#"><i className="fas fa-trash delete-icon" title="Delete"></i></Link>
    </div>
  </td>
</tr>
            
 
  </tbody>

</table>
         </div>


<div className="action-modal" id="deleteModal">
  <div className="action-modal-content">
    <h2>Delete User</h2>
    <p>Are you sure you want to delete this user ? </p>
    <p className="username" id="username-delete"></p>

    <div className="action-buttons">
      <button id="confirmDelete" >Yes</button>
      <button id="cancelDelete">Cancel</button>
    </div>
  </div>
</div>

</>
	)
}



export default HomeTable