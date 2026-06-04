export interface MovieListMapped {
    page: number;
    total_pages: number;
    total_results: number;
    results_per_page: number;
    results: MovieListItemMapped[];
}

export interface MovieListItemMapped {
    id: number;
    title: string;
    poster_url: string | null;
    rating: number;
    original_language: string;
    release_date: string;
    genre_ids: number[];
}
