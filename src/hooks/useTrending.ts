import { useQuery } from "@tanstack/react-query";

// Service
import { movies } from "@services/trendingService";

// Type
import { MovieListMapped } from "@typesLocal/moviesList.types";
import { TimeWindow } from "@typesLocal/index.types";

type TrendingParams = {
    timeWindow: TimeWindow;
};

export function useTrending({
    timeWindow
}: TrendingParams) {
    return useQuery<MovieListMapped>({
        queryKey: ["trending-movies", timeWindow],
        queryFn: () =>
            movies({
                timeWindow,
            }),
        staleTime: 1000 * 60 * 5,
    });
}
