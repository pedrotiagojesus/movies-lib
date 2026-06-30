import api from "./api";

// Types
import { MoviesMapped } from "@typesLocal/genres.type";

export const getMovies = async (): Promise<MoviesMapped> => {
    const res = await api.get("genres/movies");
    return res.data;
};
