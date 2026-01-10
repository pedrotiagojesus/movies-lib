import { getMovieImages } from "@service/movieService";
import { useQuery } from "@tanstack/react-query";

export function useMovieImages(id?: string) {
  return useQuery<MovieImageBackdrop[]>({
    queryKey: ["movie", id, "images"],
    queryFn: async () => {
      const data = await getMovieImages(id!);

      const backdrops = data.backdrops.filter((i) => i.vote_average > 0);
      const posters = data.posters.filter((i) => i.vote_average > 0);

      return [...backdrops, ...posters];
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  });
}
