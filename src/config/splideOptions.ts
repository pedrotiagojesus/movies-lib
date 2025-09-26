import type { Options } from "@splidejs/splide";

export const sliderOptions: Options = {
    gap: "1rem",
    pagination: false,
    mediaQuery: "min",
    breakpoints: {
        0: { perPage: 2, perMove: 1 },
        576: { perPage: 3, perMove: 1 },
        768: { perPage: 5, perMove: 1 },
        992: { perPage: 6, perMove: 3 },
        1200: { perPage: 6, perMove: 3 },
        1400: { perPage: 6, perMove: 3 },
    },
};

export const sliderImageOptions: Options = {
    gap: "1rem",
    pagination: false,
    mediaQuery: "min",
    breakpoints: {
        0: { perPage: 1, perMove: 1 },
        576: { perPage: 2, perMove: 1 },
        768: { perPage: 3, perMove: 1 },
        992: { perPage: 4, perMove: 3 },
        1200: { perPage: 4, perMove: 3 },
        1400: { perPage: 4, perMove: 3 },
    },
};

export const sliderVideoOptions: Options = {
    gap: "1rem",
    pagination: false,
    mediaQuery: "min",
    breakpoints: {
        0: { perPage: 1, perMove: 1 },
        576: { perPage: 2, perMove: 1 },
        768: { perPage: 2, perMove: 1 },
        992: { perPage: 3, perMove: 3 },
        1200: { perPage: 4, perMove: 4 },
        1400: { perPage: 4, perMove: 4 },
    },
};
