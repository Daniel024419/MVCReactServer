
import {  Link} from "react-router-dom";
import '../css/page404.css'
const ErrorPage = () => {
  return (
    <div  className="Page404">
    <h1>404</h1>
<p>Oops! Something is wrong.</p>
<div><iframe src="https://giphy.com/embed/qQdL532ZANbjy" frameBorder="0" className="giphy-embed" allowFullScreen></iframe></div>
<Link className="button" to="/"><i className="fas fa-home" ></i> 
Go back Home.</Link>
      
    </div>
  )
}


export default ErrorPage