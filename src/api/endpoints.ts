const BASE_API = "https://api.themoviedb.org/3/";
const API_KEY = import.meta.env.VITE_API_KEY;

export const MOVIES_API = {
    discover: (queryParams?: string) => `${BASE_API}discover/movie?${API_KEY}${queryParams ? `&${queryParams}` : ""}`,
    search: (queryParams?: string) => `${BASE_API}search/movie?${API_KEY}${queryParams ? `&${queryParams}` : ""}`,
    genre: `${BASE_API}genre/movie/list?${API_KEY}`,
    movie: (id?: number) => `${BASE_API}movie/${id ? `${id}` : ""}?${API_KEY}`,
    movieImages: (id?: number) => `${BASE_API}movie/${id ? `${id}` : ""}/images?${API_KEY}&language=en`,
    movieVideos: (id?: number) => `${BASE_API}movie/${id ? `${id}` : ""}/videos?${API_KEY}&language=en`,
    movieCredits: (id?: number) => `${BASE_API}movie/${id ? `${id}` : ""}/credits?${API_KEY}`
};

export const GENRES_API = `${BASE_API}genre/movie/list?${API_KEY}`;
