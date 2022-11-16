import axios from "../apiInterceptors/apiInterceptors";
export const getApi = (endPoint) => axios(endPoint);
export const getAll = (endpoints) => axios.all(endpoints)

