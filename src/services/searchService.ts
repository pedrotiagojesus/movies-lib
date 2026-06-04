import api from "./api";

// Types
import { MovieListMapped } from "@typesLocal/moviesList.types";

export const searchMovies = async ({
    query,
    page,
    genre,
}: {
    query: string;
    page?: string;
    genre?: string;
}): Promise<MovieListMapped> => {
    const res = await api.get("search/movies", {
        params: {
            query,
            ...(page && { page }),
            ...(genre && { genre }),
        },
    });

    return res.data;
};
