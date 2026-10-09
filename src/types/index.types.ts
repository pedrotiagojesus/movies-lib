export interface ImageMapped {
    id: string;
    image: string | null;
    width: number;
    voteAverage: number;
}

export type TimeWindow = "day" | "week";