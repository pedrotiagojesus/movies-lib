import { ImageMapped } from "../index.types";

export interface PersonMapped {
    id: number;
    name: string;
    biography: string;
    birthday: string | null;
    deathday: string | null;
    department: string;
    placeOfBirth: string | null;
    popularity: number;
    profileImage: string | null;
    images: ImageMapped[];
    movieCredits: PersonCreditsMapped;
    // credits: PersonCreditsMapped;
}

export interface PersonCreditsMapped {
    cast: PersonCastMapped[];
    crew: PersonCrewMapped[];
}

export interface PersonCastMapped {
    id: number;
    creditId: string;
    title: string;
    posterUrl: string | null;
    rating: number;
    originalLanguage: string;
    releaseDate: string;
    popularity: number;
    genreIds: number[];
    character: string;
}

export interface PersonCrewMapped {
    id: number;
    creditId: string;
    title: string;
    posterUrl: string | null;
    rating: number;
    originalLanguage: string;
    releaseDate: string;
    genreIds: number[];
    job: string;
    name: string;
}
