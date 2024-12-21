
import axios from 'axios'


const baseUrl = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": 'application/json',
  },
});




api.interceptors.request.use(
  (config) =>{
    const token = localStorage.getItem('authToken');
    if(token){
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) =>Promise.reject(error));



  // api.interceptors.response.use(
  //   (response) => response,
  //   (error) => {
  //     if(error.response?.status === 401){
  //       console.error("Unauthorized: Please log in again.");
  //     }
  //     return Promise.reject(error);
  //   }
  // );
  

  export default api;
