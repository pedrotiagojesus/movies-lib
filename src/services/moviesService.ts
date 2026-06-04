import api from "./api";

// Types
import { MovieListMapped } from "@typesLocal/mapped/moviesList.types";

export const topRatedMovies = async ({ page }: { page: number }): Promise<MovieListMapped> => {
    const params: Record<string, string> = {
        page: page.toString(),
    };
    const res = await api.get("movies/top-rated", {
        params: params,
    });
    return res.data;
};

export const upcomingMovies = async ({ page }: { page: number }): Promise<MovieListMapped> => {
    const params: Record<string, string> = {
        page: page.toString(),
    };
    const res = await api.get("movies/upcoming", {
        params: params,
    });
    return res.data;
};
