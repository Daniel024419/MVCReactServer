
import { Link } from "react-router-dom";

const TopNavBar = () => {
	return (
		<div className="TopNavBar-platform" >
		<div className="TopNavBar-platform-inner">
            
            <Link to="/" >
             <i> Home</i>
             </Link>

		     <Link to="/auth/customer/book-service" >
             <i> book services</i>
             </Link>

             <Link to="/services" >
             <i> Services</i>
             </Link>

             <Link to="/services-provider" >
             <i> Services providers </i>
             </Link>

             <Link to="/about" >
             <i> About</i>
             </Link>

             <Link to="/contact" >
             <i> contact</i>
             </Link>

             <Link to="/auth/customer/book-history" >
             <i> Booking history</i>
             </Link>

              <Link to="/login" >
             <i> Login</i>
             </Link>
		</div>
	 </div>
	)
}

export default TopNavBar