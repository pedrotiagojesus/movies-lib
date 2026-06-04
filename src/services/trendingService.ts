import api from "./api";

// Types
import { MovieListMapped } from "@typesLocal/mapped/moviesList.types";
import { TimeWindow } from "@typesLocal/mapped/index.types";

export const movies = async ({ timeWindow }: { timeWindow: TimeWindow }): Promise<MovieListMapped> => {
    const res = await api.get("trending/movies", {
        params: {
            timeWindow: timeWindow,
        },
    });
    return res.data;
};
