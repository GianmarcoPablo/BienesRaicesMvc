import axios from "axios";
import { useAuthStore } from "../store/auth-store";


const instance = axios.create({
    baseURL: "http://localhost:4000/api/v1",
    withCredentials: true,
});

instance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

export default instance;