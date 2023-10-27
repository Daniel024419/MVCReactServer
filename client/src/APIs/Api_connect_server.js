
import axios from "axios";
//https://projectlua.onrender.com
const Api_connect_server =  ( ) => {
 const api = axios.create({
  //baseURL: "http://localhost:3003"
  baseURL: "https://projectlua.onrender.com"

}); 
	return api;
}


export { Api_connect_server }