import { useQuery } from "@tanstack/react-query";

// Service
import { upcomingMovies } from "@service/movieService";

// Types
import { DiscoverResponse } from "@typesLocal/discover";

export function useUpcoming() {
    return useQuery<DiscoverResponse>({
        queryKey: ["upcoming-movies"],
        queryFn: () =>
            upcomingMovies(),
        staleTime: 1000 * 60 * 5,
    });
}
