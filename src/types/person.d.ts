interface Person {
    id: number;
    name: string;
    biography: string;
    birthday: string;
    deathday: string;
    department: string;
    place_of_birth: string;
    profile_image: string;
    popularity: number;
    images: PersonImage[];
    credits: PersonCredits;
}

interface PersonImages {
    id: string;
    image: string;
    width: number;
    vote_average: number;
}

interface PersonCredits {
    cast: PersonCast[];
    crew: PersonCrew[];
}

interface PersonCast {
    id: number;
    credit_id: string;
    title: string;
    poster_url: string;
    rating: number;
    original_language: string;
    release_date: string;
    popularity: number;
    genre_ids: number[];
    character: string;
}

interface PersonCrew {
    id: number;
    credit_id: string;
    title: string;
    poster_url: string;
    rating: number;
    original_language: string;
    release_date: string;
    genre_ids: number[];
    job: string;
    name: string;
}
