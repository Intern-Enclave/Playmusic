import UseApi from "../API/UseApi";

export const search = async (title) => {
    try {
        const res = await UseApi.search( {
            params: {
                title,
            }
        })
        return res;
    } catch (error) {
        console.log(error);
    }
}
