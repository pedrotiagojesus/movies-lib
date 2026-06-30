import api from "./api";

// Types
import { MovieListMapped } from "@typesLocal/moviesList.types";

export const getMovies = async (params: Record<string, string | number | undefined>): Promise<MovieListMapped> => {
    const normalized: Record<string, string> = {};

    for (const key in params) {
        const value = params[key];
        if (value !== undefined && value !== null) {
            normalized[key] = String(value);
        }
    }

    const res = await api.get(`discover/movie`, {
        params,
    });
    return res.data;
};
