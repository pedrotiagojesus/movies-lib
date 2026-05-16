import { useQuery } from "@tanstack/react-query";

// Service
import { topRatedMovies } from "@services/movieService";

// Types
import { DiscoverResponse } from "@typesLocal/discover";

export function useTopRated() {
    return useQuery<DiscoverResponse>({
        queryKey: ["top-rated-movies"],
        queryFn: () =>
            topRatedMovies(),
        staleTime: 1000 * 60 * 5,
    });
}
