import { Link } from "react-router-dom";

// CSS
import "./MovieCard.css";

// Config
import { IMAGE_SIZE_W500 } from "../config/tmbd";

interface MovieCardProps {
    movie: MovieCard;
}

const MovieCard = ({ movie }: MovieCardProps) => {
    const hasPoster = movie.poster_path !== null;
    const backgroundImage = hasPoster ? `url(${IMAGE_SIZE_W500}${movie.poster_path})` : undefined;

    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "";

    return (
        <div className="card movie-card">
            <div className="ratio img-wrapper" style={backgroundImage ? { backgroundImage } : {}}>
                {!hasPoster && <i className="img-placeholder bi bi-file-person-fill"></i>}
            </div>
            <div className="card-body">
                <h3 className="card-title" title={movie.title}>
                    {movie.title}
                </h3>

                <div className="row justify-content-between flex-nowrap d-md-none">
                    <div className="col flex-fill">
                        <span className="info">
                            <i className="bi bi-star-fill"></i> {movie.vote_average.toFixed(1)}
                        </span>
                    </div>
                    <div className="col">
                        <Link className="btn btn-primary" to={`/movie/${movie.id}`} title="See more">
                            Details
                        </Link>
                    </div>
                </div>
            </div>

            <Link className="btn btn-primary d-none d-md-block" to={`/movie/${movie.id}`} title="See more">
                Details
            </Link>

            <div className="badge-info">
                <span className="badge">{movie.original_language}</span>
                <span className="badge">{year}</span>
                <span className="badge show"><i className="bi bi-star-fill"></i> {movie.vote_average.toFixed(1)}</span>
            </div>
        </div>
    );
};

export default MovieCard;
