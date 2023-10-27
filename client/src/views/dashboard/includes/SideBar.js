
import { Link} from 'react-router-dom';
import { useEffect} from 'react'

const SideBar = () => {



  useEffect(() => {
    const body = document.querySelector("body");
    let modeToggle = body.querySelector(".mode-toggle");
    let sidebar = body.querySelector("nav");
    let sidebarToggle = body.querySelector(".sidebar-toggle");

    let getMode = localStorage.getItem("mode");
    if (getMode && getMode === "dark") {
      body.classList.toggle("dark");
    }

    let getStatus = localStorage.getItem("status");
    if (getStatus && getStatus === "close") {
      sidebar.classList.toggle("close");
    }


// Handle mode toggle
    const handleModeToggle = () => {
      body.classList.toggle('dark'); // Toggle the 'dark' class
      if (body.classList.contains('dark')) {
        localStorage.setItem('mode', 'dark');
      } else {
        localStorage.setItem('mode', 'light');
      }
    };


    function handleSidebarToggle() {
      sidebar.classList.toggle("close");
      if (sidebar.classList.contains("close")) {
        localStorage.setItem("status", "close");
      } else {
        localStorage.setItem("status", "open");
      }
    }



    modeToggle.addEventListener("click", handleModeToggle);
    sidebarToggle.addEventListener("click", handleSidebarToggle);

    // Cleanup function to remove event listeners
    return () => {
      modeToggle.removeEventListener("click", handleModeToggle);
      sidebarToggle.removeEventListener("click", handleSidebarToggle);
    };
  }, []);



	return (
      <nav  className="dashboard-nav"  >
        <div className="logo-name">

            <div className="logo-image">
                <img src="" alt="" / >
            </div>

            <span className="logo_name">Sobo</span>
        </div>

        <div className="dashboard-menu-items">
            
            <ul className="dashboard-nav-links">
                <li><Link to="/auth/dashboard">
                    <i className="uil uil-estate"></i>
                    <span className="link-name">Dahsboard</span>
                </Link></li>
                <li><Link to="/auth/dashboard/users">
                    <i className="uil uil-user"></i>
                    <span className="link-name">Users</span>
                </Link>
                </li>
                <li><Link to="#">
                    <i className="uil uil-chart"></i>
                    <span className="link-name">Analytics</span>
                </Link></li>
                <li><Link to="#">
                    <i className="uil uil-thumbs-up"></i>
                    <span className="link-name">Like</span>
                </Link></li>
                <li><Link to="#">
                    <i className="uil uil-comments"></i>
                    <span className="link-name">Comment</span>
                </Link></li>
                <li>
                    <Link to="#">
                    <i className="uil uil-share"></i>
                    <span className="link-name">Share</span>
                </Link>
                </li>
                 <li>
                    <Link to="#">
                    <i className="uil uil-share"></i>
                    <span className="link-name">Share</span>
                </Link>
                </li> <li>
                    <Link to="#">
                    <i className="uil uil-share"></i>
                    <span className="link-name">Share</span>
                </Link>
                </li> <li>
                    <Link to="#">
                    <i className="uil uil-share"></i>
                    <span className="link-name">Share</span>
                </Link>
                </li> <li>
                    <Link to="#">
                    <i className="uil uil-share"></i>
                    <span className="link-name">Share</span>
                </Link>
                </li> <li>
                    <Link to="#">
                    <i className="uil uil-share"></i>
                    <span className="link-name">Share</span>
                </Link>
                </li> <li>
                    <Link to="#">
                    <i className="uil uil-share"></i>
                    <span className="link-name">Share</span>
                </Link>
                </li>

            </ul>
            
            <ul className="logout-mode">
                 <li className="mode">
                    <Link to="#">
                        <i className="uil uil-moon"></i>
                    <span className="link-name">Dark Mode</span>
                </Link>

                <div className="mode-toggle">
                  <span className="switch"></span>
                </div>
            </li>
            </ul>
        </div>
    </nav>
   
	)
}



export default SideBar