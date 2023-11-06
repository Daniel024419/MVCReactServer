import { Link} from 'react-router-dom';
import { useEffect, useState} from 'react'


const HomeTable = () => {



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


//remove effect
	return () => {
searchInputtable.removeEventListener("keyup", SearchTable );

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

        <th data-sort="location">Location</th>

        <th>Action</th>
    </tr>
</thead>


<tbody >
 <tr className="no-results">
    <td colSpan="3">No results found</td>          
 </tr>


<tr>
  <td>John Forson</td>
  <td>Kumasi</td>
  <td className="menu-icon">
    <span className="menu-icon-content">&#8942;</span>
    <div className="table-dropdown dropdown-2">
      <Link to="#"><i className="fas fa-edit edit-icon" title="Edit"></i></Link>
      <Link to="#"><i className="fas fa-trash delete-icon" title="Delete" id="userIdButton" datauserid="5555" datausername="Berglunds snabbkop"  ></i></Link>
    </div>
  </td>
</tr>

<tr>
  <td>Paul Marts</td>
  <td>Accra</td>
  <td className="menu-icon">
    <span className="menu-icon-content">&#8942;</span>
    <div className="table-dropdown dropdown-2">
      <Link to="#"><i className="fas fa-edit edit-icon" title="Edit"></i></Link>
      <Link to="#"><i className="fas fa-trash delete-icon" title="Delete" id="userIdButton" datauserid="6666" datausername="Berglunds snabbkop"   ></i></Link>
    </div>
  </td>
</tr>
<tr>
  <td>Esi Tom</td>
  <td>Cape Coast</td>
  <td className="menu-icon">
    <span className="menu-icon-content">&#8942;</span>
    <div className="table-dropdown dropdown-2">
      <Link to="#"><i className="fas fa-edit edit-icon" title="Edit"></i></Link>
      <Link to="#"><i className="fas fa-trash delete-icon" title="Delete"></i></Link>
    </div>
  </td>
</tr>
<tr>
  <td>Hariet Sam </td>
  <td>Takoradi</td>
  <td className="menu-icon">
    <span className="menu-icon-content">&#8942;</span>
    <div className="table-dropdown dropdown-2">
      <Link to="#"><i className="fas fa-edit edit-icon" title="Edit"></i></Link>
      <Link to="#"><i className="fas fa-trash delete-icon" title="Delete" id="userIdButton" datauserid="3333"  ></i></Link>
    </div>
  </td>
</tr>
<tr>
  <td>Abigail Sarpomah</td>
  <td>Tarkwa</td>
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