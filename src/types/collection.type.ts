import { MovieListItemMapped } from "./moviesList.types";

export interface CollectionMapped {
    id: number;
    name: string;
    posterUrl: string | null;
    parts: MovieListItemMapped[];
}
