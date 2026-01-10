import { useQuery } from "@tanstack/react-query";

// Service
import { searchMovies } from "@service/movieService";

// Types
import { SearchResponse } from "@typesLocal/search";

type SearchParams = {
    query: string;
    page?: number;
    genre?: string;
};

export function useSearchMovies({ query, page = 1, genre }: SearchParams) {
    return useQuery<SearchResponse>({
        queryKey: ["search", query, page, genre],
        queryFn: () =>
            searchMovies({
                query,
                page,
                genre,
            }),
        staleTime: 1000 * 60 * 5,
    });
}
