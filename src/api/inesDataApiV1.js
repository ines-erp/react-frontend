import axios from "axios";

export const inesDataApiV1 = axios.create({
    baseURL: "http://localhost:5047/api/v1/",
    headers: {"Content-Type": "application/json"}
})

// inesApi.get("PaymentMethod?"+ new URLSearchParams({name:"Cash"}).toString()).then(res => console.log(res.data))