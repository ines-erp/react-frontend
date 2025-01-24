import axios from "axios";

export const inesDataApiV1 = axios.create({
    baseURL: "/api",
    headers: {"Content-Type": "application/json"}
})

export const getFromApiData = async (endpoint, params) => {
    try {
        const response = await inesDataApiV1.get(endpoint, {
            params: {...params}
        })
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

export const putToApiData = async (endpoint, dataBody) => {
    try {
        const response = (await inesDataApiV1.put(endpoint, dataBody))
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