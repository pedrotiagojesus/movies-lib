export interface MovieListMapped {
    page: number;
    totalPages: number;
    totalResults: number;
    resultsPerPage: number;
    results: MovieListItemMapped[];
}

export interface MovieListItemMapped {
    id: number;
    title: string;
    posterUrl: string | null;
    rating: number;
    originalLanguage: string;
    releaseDate: string;
    genreIds: number[];
}
