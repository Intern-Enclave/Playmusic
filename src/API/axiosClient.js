import axios from "axios";
import queryString from 'query-string';

import apiConfig from "./apiConfig";

const axiosClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        'Content-type' : 'application/json'
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => config);
axiosClient.interceptors.response.use((response) => {
    if(response && response.data){
        const data =  response.data.datas
        if(data) {
            return data;
        } 
        return [];
    }
    return response
}, (error) => {
    throw error;
});

export default axiosClient;