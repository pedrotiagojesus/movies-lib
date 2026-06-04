import { ImageMapped } from "./index.types";

export interface MovieMapped {
    id: number;
    title: string;
    tagline: string;
    release_date: string;
    genres: TMDBGenreItem[];
    budget: number;
    revenue: number;
    runtime: number;
    overview: string;
    poster_url: string | null;
    banner_url: string | null;
    rating: number;
    imdb_link: string | null;
    credits: MovieCreditsMapped | null;
    images: ImageMapped[] | null;
    trailer: string | null;
    recommendations: MovieRecommendationMapped[] | null;
    reviews: MovieReviewMapped[] | null;
    external_ids: MovieExternalIdsMapped | null;
    release_dates: MovieReleaseDatesMapped | null;
    watch_providers: MovieWatchProvidersMapped | null;
}

export interface MovieCreditsMapped {
    cast: MovieCastMapped[];
    crew: CrewByDepartment;
    departments: { code: string; name: string }[];
}

export interface MovieCastMapped {
    id: number;
    image: string | null;
    character: string;
    name: string;
}

export interface MovieCrewMapped {
    crew: CrewByDepartment;
    departments: { code: string; name: string }[];
}

export type CrewByDepartment = Record<string, MovieCrewMember[]>;

export interface MovieCrewMember {
    id: number;
    name: string;
    department: string;
    image: string | null;
}

export interface MovieReviewMapped {
    id: string;
    author: string;
    username: string;
    avatar_path: string | null;
    content: string;
    created_at: string;
}

export interface MovieRecommendationMapped {
    id: number;
    title: string;
    poster_url: string | null;
    rating: number;
    original_language: string;
    release_date: string;
    genre_ids: number[];
}

export interface MovieVideoMapped {
    id: string;
    key: string;
    site: string;
    type: string;
}

export interface MovieExternalIdsMapped {
    imdb: string | null;
    wikidata: string | null;
    facebook: string | null;
    instagram: string | null;
    twitter: string | null;
}

export interface MovieReleaseDatesMapped {
    certification: string | null;
    releaseDate: string | null;
    type: number | null;
    note: string | null;
    language: string | null;
}

export interface MovieWatchProvidersMapped {
    link: string;
    flatrate: MovieWatchProviderMapped[] | [];
    rent: MovieWatchProviderMapped[] | [];
    buy: MovieWatchProviderMapped[] | [];
    free: MovieWatchProviderMapped[] | [];
    ads: MovieWatchProviderMapped[] | [];
}

export interface MovieWatchProviderMapped {
    logo: string | null;
    provider_id: number;
    provider_name: string;
    display_priority: number;
}

export type MovieBannerMapped = string | null;
