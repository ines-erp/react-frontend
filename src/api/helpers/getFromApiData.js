import {inesDataApiV1} from "@/api/inesDataApiV1.js";

export const getFromApiData = async (endpoint) => {
    try {
        const response = await inesDataApiV1.get(endpoint)
        return response.data

    } catch (e) {
        return null
    }
}

export const PostToApiData = async (endpoint, dataBody) => {
    try {
        const response = (await inesDataApiV1.post(endpoint, dataBody))
        return response.data

    } catch (e) {
        return null
    }
}

export const DeleteFromApiData = async (endpoint) => {
    try {
        const response = await inesDataApiV1.delete(endpoint)
        return response.data

    } catch (e) {
        return null
    } 
}