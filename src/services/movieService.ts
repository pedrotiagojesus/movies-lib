import api from "./api";

export const getMovie = async (id: string): Promise<Movie> => {
    const res = await api.get("movie", {
        params: {
            id: id,
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

export const trendingMovies = async ({ timeWindow }: { timeWindow: TimeWindow }) => {
    const res = await api.get("movie/trending", {
        params: {
            timeWindow: timeWindow,
        },
    });
    return res.data;
};

export const topRatedMovies = async () => {
    const res = await api.get("movie/top-rated");
    return res.data;
};

export const upcomingMovies = async ({ page }: { page: number }) => {
    console.log(page)
    const params: Record<string, string> = {
        page: page.toString(),
    };
    const res = await api.get("movie/upcoming", {
        params: params,
    });
    return res.data;
};

export const searchMovies = async ({ query, page, genre }: { query: string; page: number; genre?: string }) => {
    const params: Record<string, string> = {
        query,
        page: page.toString(),
    };
    if (genre) params.with_genres = genre;
    const res = await api.get("movie/search", {
        params: params,
    });
    return res.data;
};

export const getGenres = async () => {
    const res = await api.get("genre/movie/list");
    return res.data;
};
