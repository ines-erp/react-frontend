import axios from "axios";
import {getLoginToken} from "@/pages/auth/login/index.jsx";

export const inesDataApiV1 = axios.create({
    baseURL: "/api",
    headers: {"Content-Type": "application/json"}
});

inesDataApiV1.interceptors.request.use(
    (config) => {
        const jwtToken = getLoginToken();
        if (jwtToken) {
            config.headers.Authorization = `Bearer ${jwtToken}`;
        }
        return config;
    }, (error) => Promise.reject(error)
);

export const getFromApiData = async (endpoint, params) => {
    try {
        const response = await inesDataApiV1.get(endpoint, {
            params: {...params}
        })
        return response.data
    } catch (e) {
        return null;
    }
};

export const postToApiData = async (endpoint, dataBody) => {
    try {
        const response = (await inesDataApiV1.post(endpoint, dataBody));
        return response.data;

    } catch (e) {
        return null;
    }
};

export const putToApiData = async (endpoint, dataBody) => {
    try {
        const response = (await inesDataApiV1.put(endpoint, dataBody));
        return response.data;

    } catch (e) {
        return null;
    }
};

export const deleteFromApiData = async (endpoint) => {
    try {
        const response = await inesDataApiV1.delete(endpoint);
        return response.data;

    } catch (e) {
        return null;
    }
};