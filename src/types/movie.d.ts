interface Movie {
    title: string;
    tagline: string;
    poster_path: string;
    budget: number;
    revenue: number;
    runtime: number;
    release_date: string;
    overview: string;
}

interface MovieCard {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    original_language: string;
}

interface MoviesResponse {
    results: MovieCard[];
    total_pages: number;
}

// --- Credits ---
interface MovieCast {
    profile_path: string;
    character: string;
    name: string;
}

interface MovieCrew {
    profile_path: string;
    department: string;
    name: string;
}

interface MovieCreditsResponse {
  id: number
  cast: MovieCast[]
  crew: MovieCrew[]
}

// --- Images ---
interface MovieImageBackdrop {
    file_path: string;
}

interface MovieImagesResponse {
  id: number
  backdrops: MovieImageBackdrop[]
  posters: MovieImageBackdrop[]
}

// --- Videos ---
interface MovieVideo {
  id: string
  key: string
  title: string
  site: string
  type: string
  official: boolean
  published_at: string
}

interface MovieVideosResponse {
  id: number
  results: MovieVideo[]
}

// --- Gender ---
interface MovieGenre {
    id: number;
    name: string;
}

interface MovieGenresResponse {
    genres: MovieGenre[];
}