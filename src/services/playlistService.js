import UseApi from "../API/UseApi";

export const GetPlaylistUser = async (username) => {
    try {
        const res = await UseApi.getPlaylist( {
            params: {
                username,
            }
        })
        return res;
    } catch (error) {
        console.log(error);
    }
}
