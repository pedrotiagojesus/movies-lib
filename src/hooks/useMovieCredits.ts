import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "@service/movieService";

export function useMovieCredits(id?: string) {
  return useQuery<MovieCreditsResponse>({
    queryKey: ["movie", id, "credits"],
    queryFn: () => getMovieCredits(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });
}
