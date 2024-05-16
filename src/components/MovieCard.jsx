import { Link } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import { BiSolidCalendarAlt } from "react-icons/bi";
import { useState } from "react";

const imageUrl = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, showLink = true }) => {
    let backgroundImage = "";

    if (movie.poster_path != null) {
        backgroundImage = `url(${imageUrl}${movie.poster_path})`;
    }

    return (
        <div className="card movie-card">
            <div
                className="ratio img-wrapper"
                style={{
                    backgroundImage: backgroundImage,
                }}
            ></div>
            <div className="card-body">
                <h3 className="card-title" title={movie.title}>
                    {movie.title}
                </h3>

                <div className="info">
                    <p>
                        <BiSolidCalendarAlt /> {movie.release_date}
                    </p>
                    <p>
                        <FaStar /> {movie.vote_average}
                    </p>
                </div>

                {showLink && (
                    <Link
                        className="btn btn-primary"
                        to={`/movie/${movie.id}`}
                        title="See more"
                    >
                        Details
                    </Link>
                )}
            </div>
        </div>
    );
};

export default MovieCard;
