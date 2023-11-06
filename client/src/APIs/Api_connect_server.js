
import axios from "axios";
//https://projectlua.onrender.com
const Api_connect_server =  ( ) => {
 const api = axios.create({
  //baseURL: process.env.REACT_APP_API_URL_DEV
  //baseURL: "https://projectlua.onrender.com"
  baseURL:process.env.REACT_APP_API_URL_PRO

}); 
	return api;
}


export { Api_connect_server }