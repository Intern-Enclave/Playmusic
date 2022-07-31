import axiosClient from "./axiosClient";

const UseApi = {
    getAllTracks: (params) => {
        // const url = 'data';
        const url = 'track';
        return axiosClient.get(url, {params})
    }, 
    getTracksId: (params) => {
        const url = 'playlist_has_track/getByPlaylistId';
        // const url = 'playlist_has_track/getByPlaylistId?playlistId=2';
        return axiosClient.get(url, params)
    }, 
    
    search: (params) => {
        const url = 'track/search';
        return axiosClient.get(url,params)
    },
    getPlaylist: (params) => {
        const url = 'playlist/getByUsername';
        return axiosClient.get(url, {params})
    },
    getTop5Album: () => {
        const url = 'album';
        return axiosClient.get(url)
    },

    getListTrackInAlbum: (params) => {
        const url = 'album/get_track';
        return axiosClient.get(url, {params})
    },
    postPlaylist: (params) => {
        const url = 'playlist'
        return axiosClient.post(url, params)
    },
    updatePlaylistName: (body) => {
        const url = 'playlist/rename';
        return axiosClient.put(url, body);
    },

    postSong: (params) => {
        const url = 'playlist_has_track/addNew'
        return axiosClient.post(url, params)
    },

    deletePlaylist: (params) => {
        const url = 'playlist'
        return axiosClient.delete(url, {params});
    },
    deleteSong: (params) => {
        const url = 'playlist_has_track/deleteByTrackIdInPlaylist'
        return axiosClient.delete(url, {params});
    },
    topSong: (params) => {
        const url = 'track/get_top'
        return axiosClient.get(url, {params});
    },


    //user
    getAllUser: () => {
        const url = 'user';
        // const url = 'data';
        return axiosClient.get(url)
    }, 
    postUser: (ob) => {
        const url = 'user/register';
        return axiosClient.post(url,ob)
    },

    updateInfoUser: (params) => {
        const url = 'user/update_info';
        return axiosClient.put(url, params);
    },
    updatePassword: (params) => {
        const url = 'user/change_password';
        return axiosClient.put(url, params);
    },
    uploadImage: (formData) => {
        const url = 'user/image';
        console.log(url)
        return axiosClient.get(url,{formData});
    },
    uploadImageTest: (formData) => {
        const url = 'user/files/upload/test';
        return axiosClient.post(url,{formData});
    },




}

export default UseApi;