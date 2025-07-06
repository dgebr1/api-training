import axios from "axios";

const API_BASE_URL = "https://35a2-196-188-126-8.ngrok-free.app";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});


export default api;

