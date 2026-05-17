import { useQuery } from "@tanstack/react-query";

// Service
import { upcomingMovies } from "@services/movieService";

type UpcomingParams = {
    page?: number;
};

export function useUpcoming({ page = 1 }: UpcomingParams = {}) {
    return useQuery<MovieResults>({
        queryKey: ["upcoming-movies", page],
        queryFn: () =>
            upcomingMovies({
                page: page,
            }),
        staleTime: 1000 * 60 * 5,
    });
}
