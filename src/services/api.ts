import axios from "axios";

// Config
import { env } from "@config/env";

const api = axios.create({
    baseURL: env.VITE_API_ENDPOINT,
    timeout: env.VITE_API_TIMEOUT,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
