import { useQuery } from "@tanstack/react-query";

// Service
import { trendingMovies } from "@services/movieService";

// Types
import { DiscoverResponse } from "@typesLocal/discover";

type TrendingParams = {
    timeWindow: TimeWindow;
};

export function useTrending({
    timeWindow
}: TrendingParams) {
    return useQuery<DiscoverResponse>({
        queryKey: ["trending-movies", timeWindow],
        queryFn: () =>
            trendingMovies({
                timeWindow,
            }),
        staleTime: 1000 * 60 * 5,
    });
}
