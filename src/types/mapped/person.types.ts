import { ImageMapped } from "./index.types";

export interface PersonMapped {
    id: number;
    name: string;
    biography: string;
    birthday: string | null;
    deathday: string | null;
    department: string;
    place_of_birth: string | null;
    popularity: number;
    profile_image: string | null;
    images: ImageMapped[];
    movie_credits: PersonCreditsMapped;
    // credits: PersonCreditsMapped;
}

export interface PersonCreditsMapped {
    cast: PersonCastMapped[];
    crew: PersonCrewMapped[];
}

export interface PersonCastMapped {
    id: number;
    credit_id: string;
    title: string;
    poster_url: string | null;
    rating: number;
    original_language: string;
    release_date: string;
    popularity: number;
    genre_ids: number[];
    character: string;
}

export interface PersonCrewMapped {
    id: number;
    credit_id: string;
    title: string;
    poster_url: string | null;
    rating: number;
    original_language: string;
    release_date: string;
    genre_ids: number[];
    job: string;
    name: string;
}
