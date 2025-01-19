
import axios from 'axios'


const baseUrl = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": 'application/json',
  },
});




api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error));



api.interceptors.response.use(
  (response) => response,
  (error) => {
    //   if(error.response?.status === 401){
    //     console.error("Unauthorized: Please log in again.");
    //   }
    //   return Promise.reject(error);
    // }
    if (error.response) {
      switch (error.response.status) {
        case 400:
          console.error("Bad Request: Token expired or invalid input.");
          break;
        case 401:
          console.error("Unauthorized: Please log in again.");
          break;
        case 403:
          console.error("Forbidden: You don't have permission to access this resource.");
          break;
        case 404:
          console.error("Not Found: The requested resource could not be found.");
          break;
        case 500:
          console.error("Internal Server Error: Please try again later.");
          break;
        case 503:
          console.error("Service Unavailable: The server is temporarily unable to handle the request.");
          break;
        default:
          console.error(`Error ${error.response.status}: ${error.response.statusText}`);
      }
    } else {
      // Handle network errors or other unexpected errors
      console.error("Network Error or Unexpected Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
