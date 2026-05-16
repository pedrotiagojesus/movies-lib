import type { Options } from "@splidejs/splide";

export const sliderOptions: Options = {
    gap: "1rem",
    pagination: false,
    mediaQuery: "min",
    breakpoints: {
        0: { perPage: 4, perMove: 1 },
        576: { perPage: 5, perMove: 1 },
        768: { perPage: 5, perMove: 1 },
        992: { perPage: 6, perMove: 1 },
        1200: { perPage: 7, perMove: 1 },
        1400: { perPage: 8, perMove: 1 },
    },
};

export const moviesOptions: Options = {
    gap: "1.5rem",
    pagination: false,
    mediaQuery: "min",
    breakpoints: {
        0: { perPage: 4, perMove: 1 },
        576: { perPage: 5, perMove: 1 },
        768: { perPage: 5, perMove: 1 },
        992: { perPage: 6, perMove: 1 },
        1200: { perPage: 6, perMove: 1 },
        1400: { perPage: 6, perMove: 3 },
    },
};