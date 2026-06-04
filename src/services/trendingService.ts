import api from "./api";

// Types
import { MovieListMapped } from "@typesLocal/moviesList.types";
import { TimeWindow } from "@typesLocal/index.types";

export const movies = async ({ timeWindow }: { timeWindow: TimeWindow }): Promise<MovieListMapped> => {
    console.log("Fetching trending movies with time window:", timeWindow);
    const res = await api.get("trending/movies", {
        params: {
            time_window: timeWindow,
        },
    });
    return res.data;
};
