import {inesDataApiV1} from "@/api/inesDataApiV1.js";

export const getFromApiData = async (endpoint) => {
    try {
        const response = await inesDataApiV1.get(endpoint)
        return response.data

    }catch (e){
        console.log(e)
    }
}