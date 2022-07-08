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
    search: (params) => {
        const url = 'track/search';
        return axiosClient.get(url,params)
    },
    getPlaylist: (params) => {
        const url = 'playlist/getByUsername';
        return axiosClient.get(url, params)
    },
    postPlaylist: (params) => {
        const url = 'playlist'
        return axiosClient.post(url, params)
    },
    deletePlaylist: (params) => {
        const url = 'playlist'
        return axiosClient.delete(url, {params});
    },
    deleteSong: (params) => {
        const url = 'playlist_has_track/deleteByTrackIdInPlaylist'
        return axiosClient.delete(url, params);
    },
}

export default UseApi;