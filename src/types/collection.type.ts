import { MovieListItemMapped } from "./moviesList.types";

export interface CollectionMapped {
    id: number;
    name: string;
    poster_url: string | null;
    parts: MovieListItemMapped[];
}
