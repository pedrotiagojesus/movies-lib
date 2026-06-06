import api from "./api";

// Types
import { MovieMapped } from "@typesLocal/movie.types";

export const getMovie = async (id: string): Promise<MovieMapped> => {
    const res = await api.get(`movie/${id}`, {
        params: {
            append_to_response:
                "credits,images,videos,reviews,recommendations,external_ids,release_dates,keywords,similar,watch/providers",
        },
    });
    return res.data;
};

export const discoverMovies = async ({
    page,
    genre,
    sortBy,
    sortDirection,
}: {
    page: number;
    genre?: string;
    sortBy: SortOption;
    sortDirection: SortDirection;
}) => {
    const params: Record<string, string> = {
        page: page.toString(),
        sort_by: `${sortBy}.${sortDirection}`,
    };
    if (genre) params.with_genres = genre;
    const res = await api.get("discover/movie", {
        params: params,
    });
    return res.data;
};

export const getGenres = async () => {
    const res = await api.get("genre/movie/list");
    return res.data;
};
