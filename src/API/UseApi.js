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
    getAllUser: () => {
        const url = 'user';
        // const url = 'data';
        return axiosClient.get(url)
    }, 
    postUser: (ob) => {
        const url = 'user/register';
        return axiosClient.post(url,ob)
    },
    search: (params) => {
        const url = 'track/search';
        return axiosClient.get(url,params)
    },
    getPlaylist: (params) => {
        const url = 'playlist/getByUsername';
        return axiosClient.get(url, {params})
    },
    postPlaylist: (params) => {
        const url = 'playlist'
        return axiosClient.post(url, params)
    },

    postSong: (params) => {
        const url = 'playlist_has_track/addNew'
        return axiosClient.post(url, params)
    },
    // postAvatar: (params) => {
    //     console.log(params)
    //     const url = 'user/files/upload'
    //     return axiosClient.post(url, params)
    // },

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

    updateInfoUser: (params) => {
        const url = 'user/update_info';
        return axiosClient.put(url, params)
    },
    updatePassword: (params) => {
        const url = 'user/change_password';
        return axiosClient.put(url, params)
    },


}

export default UseApi;