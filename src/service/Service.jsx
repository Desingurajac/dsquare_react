// import { errorMonitor } from "events";
import api from "./Api";


// const url = process.env.REACT_APP_API_BASE_URL;


// export const userLogin = async (data) => {
//     console.log("Process  =>", process.env)
//     console.log("Data  =>",data)
//     console.log("URL    ",url )
//     try {
//         const Response = await api.post(`${url}/user/login`, data);
//         return Response;
//     } catch (error) {
//         throw error;
//     }
// };

// export const userSignup = async (data) => {
//     try{
//         const response = await api.post(`${url}/user/signup`,data);
//         return response;
//     }catch(error){
//         throw error;
//     }
// }

export const apiService = {
    get:(url, params = {}) => api.get(url, {params}),
    post:(url, data) => api.post(url ,data),
    put:(url, data)  => api.put(url, data),
    delete:(url) => api.delete(url)
};

