import { useState, useCallback } from "react";

export function useMovies() {
    const [movies, setMovies] = useState<MovieCard[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getMovies = useCallback(async (apiUrl: string): Promise<void> => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`Erro na API: ${response.status}`);
            }

            const data: MoviesResponse = await response.json();

            const filteredMovies: MovieCard[] = (data.results ?? []).map((movie) => ({
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                release_date: movie.release_date,
                vote_average: movie.vote_average,
                original_language: movie.original_language,
            }));

            setMovies(filteredMovies);
            setTotalPages(data.total_pages ?? 1);
        } catch (err) {
            console.error("Erro ao buscar filmes:", err);
            setMovies([]);
            setTotalPages(1);
            setError(err instanceof Error ? err.message : "Erro desconhecido");
        } finally {
            setLoading(false);
        }
    }, []);

    return { movies, totalPages, loading, error, getMovies };
}
