 // Author: Sai Sindhu Bhimavarapu

 import axios from 'axios';

 const baseURL = 'http://localhost:3000'; // Update the base URL to your backend server
 
 const api = axios.create({
   baseURL: baseURL,
 });
 
 export default api;
 