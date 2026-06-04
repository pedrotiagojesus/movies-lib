

interface Movie {
    budget: number;
    credits: MovieCredits;
    genres: MovieGenre[];
    id: number;
    images: MovieImage[];
    overview: string;
    poster_url: string;
    banner_url: string;
    rating: number;
    recommendations: MovieResults;
    release_date: string;
    revenue: number;
    reviews: MovieReview[];
    runtime: number;
    tagline: string;
    title: string;
    trailer: string;
}

interface MovieCrewByDepartment {
    [department: string]: MovieCrew[];
}

interface MovieCrewDepartment {
    name: string;
    code: string;
}

interface MovieGenre {
    id: number;
    name: string;
}

interface MovieImage {
    id: number;
    image: string;
}
interface MovieReview {
    id: string;
    author: string;
    avatar_path: string;
    content: string;
    created_at: string;
    username: string;
}

interface MovieResults {
    current_page: number;
    results: MovieResultItem[];
    results_per_page: number;
    total_pages: number;
    total_results: number;
}

interface MovieResultItem {
    genre_ids: MovieGenre[];
    id: number;
    original_language: string;
    poster_url: string;
    rating: number;
    release_date: string;
    title: string;
}

interface MovieCard {
    id: number;
    title: string;
    poster_url: string;
    release_date: string;
    rating: number;
    original_language: string;
}

interface MoviesResponse {
    results: MovieCard[];
    total_pages: number;
}

// --- Credits ---

interface MovieCredits {
    cast: MovieCast[];
    crew: MovieCrewByDepartment;
    departments: MovieCrewDepartment[];
}

interface MovieCast {
    character: string;
    id: number;
    image: string;
    name: string;
}

interface MovieCrew {
    department: string;
    id: number;
    image: string;
    name: string;
}

interface MovieCrewDepartment {
    code: string;
    name: string;
}

// --- Images ---
interface MovieImageBackdrop {
    file_path: string;
    vote_average: number;
}

interface MovieImagesResponse {
    id: number;
    backdrops: MovieImageBackdrop[];
    posters: MovieImageBackdrop[];
}

// --- Videos ---
interface MovieVideo {
    id: string;
    key: string;
    title: string;
    site: string;
    type: string;
    official: boolean;
    published_at: string;
    size: number;
}

interface MovieVideosResponse {
    id: number;
    results: MovieVideo[];
}

// --- Gender ---

interface MovieGenresResponse {
    genres: MovieGenre[];
}
