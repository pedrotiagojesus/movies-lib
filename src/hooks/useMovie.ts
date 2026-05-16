import { useQuery } from "@tanstack/react-query";
import { getMovie } from "@services/movieService";

export function useMovie(id: string) {

    return useQuery<Movie, Error>({
        queryKey: ["movie", id],
        queryFn: () => getMovie(id),
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
}
