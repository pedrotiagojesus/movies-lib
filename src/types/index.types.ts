export interface ImageMapped {
    id: string;
    image: string | null;
    width: number;
    vote_average: number;
}

export type TimeWindow = "day" | "week";