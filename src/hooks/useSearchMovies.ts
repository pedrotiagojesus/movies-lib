import { useQuery } from "@tanstack/react-query";

// Service
import { searchMovies } from "@services/searchService";

// Types
import { MovieListMapped } from "@typesLocal/moviesList.types";

type SearchParams = {
    query: string;
    page?: string;
    genre?: string;
};

export function useSearchMovies({ query, page, genre }: SearchParams) {
    return useQuery<MovieListMapped>({
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
