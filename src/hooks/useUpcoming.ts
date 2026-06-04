import { useQuery } from "@tanstack/react-query";

// Service
import { upcomingMovies } from "@services/moviesService";

// Type
import { MovieListMapped } from "@typesLocal/mapped/moviesList.types";

type UpcomingParams = {
    page?: number;
};

export function useUpcoming({ page = 1 }: UpcomingParams = {}) {
    return useQuery<MovieListMapped>({
        queryKey: ["upcoming-movies", page],
        queryFn: () =>
            upcomingMovies({
                page: page,
            }),
        staleTime: 1000 * 60 * 5,
    });
}
