import { useQuery } from "@tanstack/react-query";
import { getGenres } from "@service/movieService";

export function useGenres() {

    return useQuery<{ [key: string]: any }, Error>({
        queryKey: ["genre"],
        queryFn: () => getGenres(),
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
}
