import { useQuery } from "@tanstack/react-query";
import { getMovieVideos } from "@services/movieService";

export function useMovieVideo(id?: string) {
    return useQuery<MovieVideo | null>({
        queryKey: ["movie", id, "video"],
        queryFn: async () => {
            const data = await getMovieVideos(id!);

            const trailers = data.results.filter((v: MovieVideo) => v.site === "YouTube" && v.type === "Trailer");

            if (!trailers.length) return null;

            return trailers.sort((a, b) => {
                if (a.official !== b.official) return b.official ? 1 : -1;
                if (a.size !== b.size) return b.size - a.size;
                return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
            })[0];
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 60,
    });
}
