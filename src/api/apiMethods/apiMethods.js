import axios from "../apiInterceptors/apiInterceptors";
import { parentUrl } from "../parentUrl/parentUrl";

const axiosClient = axios.create();
axiosClient.defaults.baseURL = `${parentUrl.url}`;

axiosClient.defaults.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json; charset=utf-8'
};
axiosClient.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});




export const Update = (endPoint, data) => axiosClient.put(endPoint, data)

export const GetMethod = (endPoint) => axiosClient.get(endPoint)


export const getApi = (endPoint) => axios(endPoint);
export const getAll = (endpoints) => axios.all(endpoints)

