import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
    BsGraphUp,
    BsWallet2,
    BsHourglassSplit,
    BsFillFileEarmarkTextFill,
    BsChevronLeft,
    BsChevronRight,
} from "react-icons/bs";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import "./Movie.css";
import "../Splide.css";

const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const imageUrl = import.meta.env.VITE_IMG;

const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [movieCredit, setMovieCredit] = useState(null);

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

    useEffect(() => {
        const apiUrl = `${moviesUrl}${id}?${apiKey}`;
        getMovie(apiUrl);
    }, []);

    // Get Movie Crdits
    const getMovieCredit = async (apiUrl) => {
        const res = await fetch(apiUrl);
        const data = await res.json();

        setMovieCredit(data);
    };

    useEffect(() => {
        const apiUrl = `${moviesUrl}${id}/credits?${apiKey}`;
        getMovieCredit(apiUrl);
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

    return (
        <div id="movie-page" className="container">
            {movie && (
                <>
                    <div className="row">
                        <div className="col-md-4">
                            <img
                                src={`${imageUrl}${movie.poster_path}`}
                                alt={movie}
                                className="img-fluid"
                            />
                        </div>
                        <div className="col-md-8">
                            <h2 className="title">{movie.title}</h2>
                            <p className="tagline">{movie.tagline}</p>
                            <div className="list-info">
                                <div className="info">
                                    <h3>
                                        <BsWallet2 className="icon" /> Budget
                                    </h3>
                                    <p>{formatCurrency(movie.budget)}</p>
                                </div>
                                <div className="info">
                                    <h3>
                                        <BsGraphUp className="icon" /> Revenue
                                    </h3>
                                    <p>{formatCurrency(movie.revenue)}</p>
                                </div>
                                <div className="info">
                                    <h3>
                                        <BsHourglassSplit className="icon" />{" "}
                                        Runtime
                                    </h3>
                                    <p>{movie.runtime} minutes</p>
                                </div>
                            </div>
                            <div className="info description">
                                <h3>
                                    <BsFillFileEarmarkTextFill className="icon" />{" "}
                                    Overview
                                </h3>
                                <p>{movie.overview} </p>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {movieCredit && (
                <div className="credit">
                    {movieCredit.cast && (
                        <>
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
                                            <div className="card credit-card">
                                                <div
                                                    className="ratio img-wrapper"
                                                    style={{
                                                        backgroundImage: `url(${imageUrl}${cast.profile_path})`,
                                                    }}
                                                ></div>
                                                <div className="card-body">
                                                    <h4
                                                        className="card-title"
                                                        title={cast.character}
                                                    >
                                                        {cast.character}
                                                    </h4>
                                                    <h5 className="card-subtitle">
                                                        {cast.name}
                                                    </h5>
                                                </div>
                                            </div>
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
                        </>
                    )}
                    {movieCredit.crew && (
                        <>
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
                                            <div className="card credit-card">
                                                <div
                                                    className="ratio img-wrapper"
                                                    style={{
                                                        backgroundImage: `url(${imageUrl}${crew.profile_path})`,
                                                    }}
                                                ></div>
                                                <div className="card-body">
                                                    <h4
                                                        className="card-title"
                                                        title={crew.name}
                                                    >
                                                        {crew.name}
                                                    </h4>
                                                    <h5 className="card-subtitle">
                                                        {crew.department}
                                                    </h5>
                                                </div>
                                            </div>
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
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Movie;
