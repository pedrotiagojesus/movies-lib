import { useQuery } from "@tanstack/react-query";

// Service
import { trendingMovies } from "@services/movieService";

type TrendingParams = {
    timeWindow: TimeWindow;
};

export function useTrending({
    timeWindow
}: TrendingParams) {
    return useQuery<MovieResults>({
        queryKey: ["trending-movies", timeWindow],
        queryFn: () =>
            trendingMovies({
                timeWindow,
            }),
        staleTime: 1000 * 60 * 5,
    });
}
