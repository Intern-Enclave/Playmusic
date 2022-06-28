import axiosClient from "./axiosClient";

const UseApi = {
    getAllTracks: (params) => {
        const url = 'track';
        return axiosClient.get(url, {params})
    }, 
    get: (id) => {
        const url = `track/${id}`;
        return axiosClient.get(url)
    }, 
    search: (params) => {
        const url = 'track/search'
        return axiosClient.get(url,params)
    }

}

export default UseApi;