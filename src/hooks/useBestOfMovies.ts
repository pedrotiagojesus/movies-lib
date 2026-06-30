import { useQuery } from "@tanstack/react-query";

// Service
import { getMovies } from "@services/discoverService";

// Type
import { MovieListMapped } from "@typesLocal/moviesList.types";

type BestOfMoviesParams = {
    with_genres?: number;
    primary_release_year?: number | "";
};

export function useBestOfMovies({ with_genres, primary_release_year }: BestOfMoviesParams = {}) {
    const params: Record<string, any> = {
        with_genres,
        sort_by: "vote_average.desc",
        "vote_count.gte": 10000,
    };

    if (primary_release_year && primary_release_year > 0) {
        params.primary_release_year = primary_release_year;
    }

    return useQuery<MovieListMapped>({
        queryKey: ["best-of-movies", with_genres, primary_release_year ?? "all"],
        queryFn: () => getMovies(params),
        staleTime: 1000 * 60 * 5,
    });
}
