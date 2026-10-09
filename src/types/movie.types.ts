import { ImageMapped } from "./index.types";

export interface MovieMapped {
    id: number;
    title: string;
    tagline: string;
    releaseDate: string;
    genres: MovieGenreItem[];
    budget: number;
    revenue: number;
    runtime: number;
    overview: string;
    language: string;
    posterUrl: string | null;
    bannerUrl: string | null;
    productionCompanies: MovieProductionCompanyMapped[];
    rating: number;
    imdbLink: string | null;
    credits: MovieCreditsMapped | null;
    images: ImageMapped[] | null;
    trailer: string | null;
    collection: { id: number; name: string; posterUrl: string | null } | null;
    recommendations: MovieRecommendationMapped[] | null;
    reviews: MovieReviewMapped[] | null;
    externalIds: MovieExternalIdsMapped | null;
    releaseDates: MovieReleaseDatesMapped | null;
    watchProviders: MovieWatchProvidersMapped | null;
    keywords: MovieKeywordsMapped[] | null;
    similar: MovieSimilarsMapped[] | null;
}

interface MovieProductionCompanyMapped {
    id: number;
    logo: string | null;
    name: string;
    originCountry: string;
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
    avatarUrl: string | null;
    content: string;
    createdAt: string;
}

export interface MovieRecommendationMapped {
    id: number;
    title: string;
    posterUrl: string | null;
    rating: number;
    originalLanguage: string;
    releaseDate: string;
    genreIds: number[];
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
    description: string | null;
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
    providerId: number;
    providerName: string;
    displayPriority: number;
}

export interface MovieGenreItem {
    id: number;
    name: string;
}

export interface MovieKeywordsMapped {
    id: number;
    name: string;
}

export interface MovieSimilarsMapped {
    id: number;
    title: string;
    posterUrl: string | null;
    rating: number;
    originalLanguage: string;
    releaseDate: string;
    genreIds: number[];
}

export type MovieBannerMapped = string | null;
