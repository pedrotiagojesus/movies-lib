import { env } from "@config/env";
import client from "../api/client";
import API_ENDPOINTS from "../api/endpoint";

export const getMovie = async (id: string) => {
    const res = await client.get(API_ENDPOINTS.MOVIE.replace(":id", id.toString()), {
        params: {
            api_key: env.VITE_API_KEY,
        },
    });
    return res.data;
};

export const getMovieCredits = async (id: string) => {
    const res = await client.get(API_ENDPOINTS.MOVIE_CREDITS.replace(":id", id), {
        params: { api_key: env.VITE_API_KEY },
    });
    return res.data;
};

export const getMovieImages = async (id: string) => {
    const res = await client.get(API_ENDPOINTS.MOVIE_IMAGES.replace(":id", id), {
        params: { api_key: env.VITE_API_KEY },
    });
    return res.data;
};

export const getMovieVideos = async (id: string) => {
    const res = await client.get(API_ENDPOINTS.MOVIE_VIDEOS.replace(":id", id), {
        params: { api_key: env.VITE_API_KEY },
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
        api_key: env.VITE_API_KEY,
        page: page.toString(),
        sort_by: `${sortBy}.${sortDirection}`,
    };
    if (genre) params.with_genres = genre;
    const res = await client.get(API_ENDPOINTS.DISCOVER, {
        params: params,
    });
    return res.data;
};

export const searchMovies = async ({ query, page, genre }: { query: string; page: number; genre?: string }) => {
    const params: Record<string, string> = {
        api_key: env.VITE_API_KEY,
        query,
        page: page.toString(),
    };
    if (genre) params.with_genres = genre;
    const res = await client.get(API_ENDPOINTS.SEARCH, {
        params: params,
    });
    return res.data;
};

export const getGenres = async () => {
    const res = await client.get(API_ENDPOINTS.GENRE, {
        params: { api_key: env.VITE_API_KEY },
    });
    return res.data;
};
