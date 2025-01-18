import axios from "axios";

export const inesAuthApiV1 = axios.create({
    baseURL: "/api",
    headers: {"Content-Type": "application/json"}
});

export const loginToApi = async (dataBody) => {
    try {
        const response = await inesAuthApiV1.post("/Auth/Login", dataBody);
        return response.data;
    } catch (e) {
        return e.message;
    }
};