import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
    BsGraphUp,
    BsWallet2,
    BsHourglassSplit,
    BsFillFileEarmarkTextFill,
} from "react-icons/bs";
import { useTmdbGet } from "../hooks/useTmdbGet";

import "./Movie.css";

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

    return (
        <div className="container movie-page">
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
                            <h2>{movie.title}</h2>
                            <p className="tagline">{movie.tagline}</p>
                            <div className="list-info">
                                <div className="info">
                                    <h3>
                                        <BsWallet2 /> Budget
                                    </h3>
                                    <p>{formatCurrency(movie.budget)}</p>
                                </div>
                                <div className="info">
                                    <h3>
                                        <BsGraphUp /> Revenue
                                    </h3>
                                    <p>{formatCurrency(movie.revenue)}</p>
                                </div>
                                <div className="info">
                                    <h3>
                                        <BsHourglassSplit /> Runtime
                                    </h3>
                                    <p>{movie.runtime} minutes</p>
                                </div>
                            </div>
                            <div className="info description">
                                <h3>
                                    <BsFillFileEarmarkTextFill /> Overview
                                </h3>
                                <p>{movie.overview} </p>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {movieCredit && (
                <>
                    {movieCredit.cast && (
                        <>
                            <h2 className="title">Cast</h2>
                            <div className="row credit-container">
                                {movieCredit.cast.map((cast) => (
                                    <div key={cast.id} className="col-md-2">
                                        <div className="card credit-card">
                                            <div
                                                className="ratio img-wrapper"
                                                style={{
                                                    backgroundImage: `url(${imageUrl}${cast.profile_path})`,
                                                }}
                                            ></div>
                                            <div className="card-body">
                                                <h4 className="card-title">
                                                    {cast.character}
                                                </h4>
                                                <h5 className="card-subtitle">
                                                    {cast.name}
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    {movieCredit.crew && (
                        <>
                            <h2 className="title">Crew</h2>
                            <div className="row credit-container">
                                {movieCredit.crew.map((crew) => (
                                    <div key={crew.id} className="col-md-2">
                                        <div className="card credit-card">
                                            <div
                                                className="ratio img-wrapper"
                                                style={{
                                                    backgroundImage: `url(${imageUrl}${crew.profile_path})`,
                                                }}
                                            ></div>
                                            <div className="card-body">
                                                <h4 className="card-title">
                                                    {crew.name}
                                                </h4>
                                                <h5 className="card-subtitle">
                                                    {crew.department}
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Movie;
