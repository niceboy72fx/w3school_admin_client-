import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
});

// apis.defaults.headers['']
api.defaults.withCredentials = true

export default api;