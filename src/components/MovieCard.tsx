import { Link } from "react-router-dom";

// CSS
import "./MovieCard.css";

// Icons
import { FaStar } from "react-icons/fa";
import { BsCardImage } from "react-icons/bs";

// Env
const imageUrl = import.meta.env.VITE_IMG;

interface MovieCardProps {
    movie: MovieCard;
}

const MovieCard = ({ movie }: MovieCardProps) => {

    const hasPoster = movie.poster_path !== null;
    const backgroundImage = hasPoster ? `url(${imageUrl}${movie.poster_path})` : undefined;

    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "";

    return (
        <div className="card movie-card">
            <div className="ratio img-wrapper" style={backgroundImage ? { backgroundImage } : {}}>
                {!hasPoster && <BsCardImage />}
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

                <Link className="btn btn-primary" to={`/movies-lib/movie/${movie.id}`} title="See more">
                    Details
                </Link>
            </div>

            <div className="badge-info">
                <span className="badge">{movie.original_language}</span>
                <span className="badge">{year}</span>
            </div>
        </div>
    );
};

export default MovieCard;
