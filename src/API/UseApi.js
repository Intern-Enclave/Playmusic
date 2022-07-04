import axiosClient from "./axiosClient";

const UseApi = {
    getAllTracks: (params) => {
        const url = 'data';
        // const url = 'track';
        return axiosClient.get(url, {params})
    }, 
    getAllUser: () => {
        // const url = 'user';
        const url = 'data';
        return axiosClient.get(url)
    }, 
    search: (params) => {
        const url = 'track/search'
        return axiosClient.get(url,params)
    }

}

export default UseApi;