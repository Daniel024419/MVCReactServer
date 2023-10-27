 import { Link} from 'react-router-dom';
 import { useEffect } from 'react'

const Footer = () => {

  useEffect(() => {
    const supportLink = document.getElementById("supportLink");
    const supportModal = document.getElementById("supportModal");
    const closeModal = document.getElementById("closeModal");

    function showSupportModal() {
      supportModal.style.display = "block";
     }

    function closeSupportModal() {
      supportModal.style.display = "none";
     }

    function closeOnEscape(event) {
      if (event.key === "Escape") {
        closeSupportModal();
      }
    }

    supportLink.addEventListener("click", showSupportModal);
    closeModal.addEventListener("click", closeSupportModal);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      supportLink.removeEventListener("click", showSupportModal);
      closeModal.removeEventListener("click", closeSupportModal);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);


	return (
		<>
			
	<div className="supportModal"  id="supportModal">
    <div className="modal-content">
      <span className="close" id="closeModal" title="Close modal" >&times;</span>
      <h2>Support Form</h2>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="5" required></textarea>
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>

  
 <div className="settings-icon">


    <i className="uil uil-cog" id="settingsIcon"></i>

    <div className="action-menu" id="actionMenu">
      <ul>
        <li><Link href="#">Settings</Link></li>
        <li><Link href="#">Profile</Link></li>
        <li><Link href="#">Logout</Link></li>
        <li><Link href="#" id="supportLink" >Support</Link></li>
      </ul>
    </div>
  </div>
		</>
	)
}


export default Footer