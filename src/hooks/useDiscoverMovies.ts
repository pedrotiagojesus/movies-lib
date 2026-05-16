import { useQuery } from "@tanstack/react-query";

// Service
import { discoverMovies } from "@services/movieService";

// Types
import { DiscoverResponse } from "@typesLocal/discover";

type DiscoverParams = {
    page?: number;
    genre?: string;
    sortBy: SortOption;
    sortDirection: SortDirection;
};

export function useDiscoverMovies({
    page = 1,
    genre,
    sortBy,
    sortDirection,
}: DiscoverParams) {
    return useQuery<DiscoverResponse>({
        queryKey: ["discover", page, genre, sortBy, sortDirection],
        queryFn: () =>
            discoverMovies({
                page,
                genre,
                sortBy,
                sortDirection,
            }),
        staleTime: 1000 * 60 * 5,
    });
}
