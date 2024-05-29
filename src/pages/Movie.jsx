import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
    BsGraphUp,
    BsWallet2,
    BsHourglassSplit,
    BsFillFileEarmarkTextFill,
    BsCalendar3,
    BsChevronRight,
} from "react-icons/bs";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import "./Movie.css";
import "../Splide.css";

import PersonCard from "../components/PersonCard";

const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const imageUrl = import.meta.env.VITE_IMG;

const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [movieCredit, setMovieCredit] = useState(null);
    const [movieImage, setMovieImage] = useState(null);
    const [movieVideo, setMovieVideo] = useState([]);

    const formatCurrency = (number) => {
        return number.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    };

    // Get Movie
    const getMovie = async (apiUrl) => {
        const res = await fetch(apiUrl);
        const data = await res.json();

        setMovie(data);
    };

    // Get Movie Credits
    const getMovieCredit = async (apiUrl) => {
        const res = await fetch(apiUrl);
        const data = await res.json();

        setMovieCredit(data);
    };

    // Get Movie Images
    const getMovieImage = async (apiUrl) => {
        const res = await fetch(apiUrl);
        const data = await res.json();

        setMovieImage(data.backdrops);
    };

    // Get Movie Video
    const getMovieVideo = async (apiUrl) => {
        const res = await fetch(apiUrl);
        const data = await res.json();

        const allowType = ["Trailer", "Teaser"];

        setMovieVideo([]);

        data.results.map((video) => {
            if (!video.official) {
                return;
            }

            if (!allowType.includes(video.type)) {
                return;
            }

            setMovieVideo((prevArray) => [video, ...prevArray]);
        });
    };

    useEffect(() => {
        const movieUrl = `${moviesUrl}${id}?${apiKey}`;
        getMovie(movieUrl);

        const creditUrl = `${moviesUrl}${id}/credits?${apiKey}`;
        getMovieCredit(creditUrl);

        const imageUrl = `${moviesUrl}${id}/images?${apiKey}&language=en`;
        getMovieImage(imageUrl);

        const videoUrl = `${moviesUrl}${id}/videos?${apiKey}&language=en`;
        getMovieVideo(videoUrl);
    }, []);

    const sliderOptions = {
        gap: "1rem",
        pagination: false,
        mediaQuery: "min",
        breakpoints: {
            0: {
                perPage: 2,
                perMove: 1,
            },
            576: {
                perPage: 3,
                perMove: 1,
            },
            768: {
                perPage: 5,
                perMove: 1,
            },
            992: {
                perPage: 6,
                perMove: 3,
            },
            1200: {
                perPage: 6,
                perMove: 3,
            },
            1400: {
                perPage: 6,
                perMove: 3,
            },
        },
    };

    const sliderImageOptions = {
        gap: "1rem",
        pagination: false,
        mediaQuery: "min",
        breakpoints: {
            0: {
                perPage: 1,
                perMove: 1,
            },
            576: {
                perPage: 2,
                perMove: 1,
            },
            768: {
                perPage: 3,
                perMove: 1,
            },
            992: {
                perPage: 4,
                perMove: 3,
            },
            1200: {
                perPage: 4,
                perMove: 3,
            },
            1400: {
                perPage: 4,
                perMove: 3,
            },
        },
    };

    const sliderVideoOptions = {
        gap: "1rem",
        pagination: false,
        mediaQuery: "min",
        breakpoints: {
            0: {
                perPage: 1,
                perMove: 1,
            },
            576: {
                perPage: 2,
                perMove: 1,
            },
            768: {
                perPage: 2,
                perMove: 1,
            },
            992: {
                perPage: 3,
                perMove: 3,
            },
            1200: {
                perPage: 4,
                perMove: 4,
            },
            1400: {
                perPage: 4,
                perMove: 4,
            },
        },
    };

    const renderVideo = (video) => {
        return (
            <iframe
                src={`https://www.youtube.com/embed/${video.key}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="mw-100"
            ></iframe>
        );
    };

    return (
        <div id="movie-page" className="container">
            {movie && (
                <>
                    <h2 className="title d-md-none">{movie.title}</h2>
                    <p className="tagline d-md-none">{movie.tagline}</p>
                    <div className="row">
                        <div className="col-md-4">
                            <img
                                src={`${imageUrl}${movie.poster_path}`}
                                alt={movie.title}
                                className="img-fluid mb-3 mb-md-0"
                            />
                        </div>
                        <div className="col-md-8">
                            <h2 className="title d-none d-md-block">
                                {movie.title}
                            </h2>
                            <p className="tagline d-none d-md-block">
                                {movie.tagline}
                            </p>
                            <div className="list-info">
                                <div className="info">
                                    <h5>
                                        <BsWallet2 className="icon" /> Budget
                                    </h5>
                                    <p>{formatCurrency(movie.budget)}</p>
                                </div>
                                <div className="info">
                                    <h5>
                                        <BsGraphUp className="icon" /> Revenue
                                    </h5>
                                    <p>{formatCurrency(movie.revenue)}</p>
                                </div>
                                <div className="info">
                                    <h5>
                                        <BsHourglassSplit className="icon" />{" "}
                                        Runtime
                                    </h5>
                                    <p>{movie.runtime} minutes</p>
                                </div>
                                <div className="info">
                                    <h5>
                                        <BsCalendar3 className="icon" /> Release
                                        date
                                    </h5>
                                    <p>{movie.release_date}</p>
                                </div>
                            </div>
                            <div className="info description">
                                <h5>
                                    <BsFillFileEarmarkTextFill className="icon" />{" "}
                                    Overview
                                </h5>
                                <p>{movie.overview} </p>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div className="movie-details">
                {movieImage && (
                    <div className="image">
                        <h2 className="title">Images</h2>
                        <Splide
                            aria-label="Images"
                            className="image-container"
                            options={sliderImageOptions}
                            hasTrack={false}
                        >
                            <SplideTrack>
                                {movieImage.map((image, i) => (
                                    <SplideSlide key={`image-${i}`}>
                                        <img
                                            src={`${imageUrl}${image.file_path}`}
                                            alt={`image-${i}`}
                                            className="img-fluid"
                                        />
                                    </SplideSlide>
                                ))}
                            </SplideTrack>

                            <div className="splide__arrows">
                                <button
                                    className="splide__arrow splide__arrow--prev"
                                    type="button"
                                    aria-label="Previous slide"
                                    aria-controls="splide01-track"
                                >
                                    <BsChevronRight />
                                </button>
                                <button
                                    className="splide__arrow splide__arrow--next"
                                    type="button"
                                    aria-label="Next slide"
                                    aria-controls="splide01-track"
                                >
                                    <BsChevronRight />
                                </button>
                            </div>
                        </Splide>
                    </div>
                )}
                {movieVideo && (
                    <div className="video">
                        <h2 className="title">Videos</h2>
                        <Splide
                            aria-label="Video"
                            className="video-container"
                            options={sliderVideoOptions}
                            hasTrack={false}
                        >
                            <SplideTrack>
                                {movieVideo.map((video, i) => (
                                    <SplideSlide key={`video-${i}`}>
                                        {renderVideo(video)}
                                    </SplideSlide>
                                ))}
                            </SplideTrack>

                            <div className="splide__arrows">
                                <button
                                    className="splide__arrow splide__arrow--prev"
                                    type="button"
                                    aria-label="Previous slide"
                                    aria-controls="splide01-track"
                                >
                                    <BsChevronRight />
                                </button>
                                <button
                                    className="splide__arrow splide__arrow--next"
                                    type="button"
                                    aria-label="Next slide"
                                    aria-controls="splide01-track"
                                >
                                    <BsChevronRight />
                                </button>
                            </div>
                        </Splide>
                    </div>
                )}
                {movieCredit && movieCredit.cast && (
                    <div className="movie-cast">
                        <h2 className="title">Cast</h2>
                        <Splide
                            aria-label="Cast"
                            className="credit-container"
                            options={sliderOptions}
                            hasTrack={false}
                        >
                            <SplideTrack>
                                {movieCredit.cast.map((cast, i) => (
                                    <SplideSlide key={`cast-${i}`}>
                                        <PersonCard
                                            image={cast.profile_path}
                                            title={cast.character}
                                            subtitle={cast.name}
                                        />
                                    </SplideSlide>
                                ))}
                            </SplideTrack>

                            <div className="splide__arrows">
                                <button
                                    className="splide__arrow splide__arrow--prev"
                                    type="button"
                                    aria-label="Previous slide"
                                    aria-controls="splide01-track"
                                >
                                    <BsChevronRight />
                                </button>
                                <button
                                    className="splide__arrow splide__arrow--next"
                                    type="button"
                                    aria-label="Next slide"
                                    aria-controls="splide01-track"
                                >
                                    <BsChevronRight />
                                </button>
                            </div>
                        </Splide>
                    </div>
                )}
                {movieCredit && movieCredit.crew && (
                    <div className="movie-crew">
                        <h2 className="title">Crew</h2>
                        <Splide
                            aria-label="Crew"
                            className="credit-container"
                            options={sliderOptions}
                            hasTrack={false}
                        >
                            <SplideTrack>
                                {movieCredit.crew.map((crew, i) => (
                                    <SplideSlide key={`crew-${i}`}>
                                        <PersonCard
                                            image={crew.profile_path}
                                            title={crew.name}
                                            subtitle={crew.department}
                                        />
                                    </SplideSlide>
                                ))}
                            </SplideTrack>

                            <div className="splide__arrows">
                                <button
                                    className="splide__arrow splide__arrow--prev"
                                    type="button"
                                    aria-label="Previous slide"
                                    aria-controls="splide01-track"
                                >
                                    <BsChevronRight />
                                </button>
                                <button
                                    className="splide__arrow splide__arrow--next"
                                    type="button"
                                    aria-label="Next slide"
                                    aria-controls="splide01-track"
                                >
                                    <BsChevronRight />
                                </button>
                            </div>
                        </Splide>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Movie;
