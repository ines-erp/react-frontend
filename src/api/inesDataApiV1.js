import axios from "axios";

export const inesDataApiV1 = axios.create({
    baseURL: "/api",
    headers: {"Content-Type": "application/json"}
})

// inesDataApiV1.get("PaymentMethod?"+ new URLSearchParams({name:"Cash"}).toString()).then(res => console.log(res.data))