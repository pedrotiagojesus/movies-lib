import axios from "axios";

// Config
import { env } from "@config/env";

const client = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    timeout: env.VITE_TIMEOUT,
    headers: {
        "Content-Type": "application/json",
    },
});

export default client;
