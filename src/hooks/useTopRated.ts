import { useQuery } from "@tanstack/react-query";

// Service
import { topRatedMovies } from "@services/moviesService";

// Type
import { MovieListMapped } from "@typesLocal/moviesList.types";

type TopRatedParams = {
    page?: number;
};

export function useTopRated({ page = 1 }: TopRatedParams = {}) {
    return useQuery<MovieListMapped>({
        queryKey: ["top-rated-movies", page],
        queryFn: () =>
            topRatedMovies({
                page: page,
            }),
        staleTime: 1000 * 60 * 5,
    });
}
