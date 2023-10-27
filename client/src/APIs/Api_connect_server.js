
import axios from "axios";

const Api_connect_server =  ( ) => {
 const api = axios.create({
  baseURL: "http://localhost:3002"
}); 
	return api;
}


export { Api_connect_server }