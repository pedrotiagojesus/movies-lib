import { Movie } from "./movie";

export interface DiscoverResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}
