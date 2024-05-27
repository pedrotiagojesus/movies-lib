import "./MovieCard.css";

import { Link } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import { BsCardImage } from "react-icons/bs";

const imageUrl = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, showLink = true }) => {
    let backgroundImage = "";
    let emptyImage = <BsCardImage />;
    if (movie.poster_path != null) {
        backgroundImage = `url(${imageUrl}${movie.poster_path})`;
        emptyImage = "";
    }

    const getYear = () => {
        if (movie.release_date === "") {
            return;
        }

        let objectDate = new Date(movie.release_date);
        return objectDate.getFullYear();
    };

    getYear();

    return (
        <div className="card movie-card">
            <div
                className="ratio img-wrapper"
                style={{
                    backgroundImage: backgroundImage,
                }}
            >
                {emptyImage}
            </div>
            <div className="card-body">
                <h3 className="card-title" title={movie.title}>
                    {movie.title}
                </h3>

                <div className="info">
                    <p>
                        <FaStar /> {movie.vote_average}
                    </p>
                </div>

                {showLink && (
                    <Link
                        className="btn btn-primary"
                        to={`/movies-lib/movie/${movie.id}`}
                        title="See more"
                    >
                        Details
                    </Link>
                )}
            </div>

            <div className="badge-info">
                <span className="badge">{movie.original_language}</span>
                <span className="badge">{getYear()}</span>
            </div>
        </div>
    );
};

export default MovieCard;
