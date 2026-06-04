import { useNavigate } from "react-router-dom";
import { useRef } from "react";

// CSS
import "./MovieCard.css";

import { MovieListItemMapped } from "@typesLocal/moviesList.types";

interface MovieCardProps {
    movie: MovieListItemMapped;
}

const MovieCard = ({ movie }: MovieCardProps) => {
    const hasPoster = movie.poster_url !== null;
    const backgroundImage = hasPoster ? `url(${movie.poster_url})` : undefined;
    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "";

    const navigate = useNavigate();
    const pointerStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    const handlePointerDown = (e: React.PointerEvent) => {
        pointerStart.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        const dx = Math.abs(e.clientX - pointerStart.current.x);
        const dy = Math.abs(e.clientY - pointerStart.current.y);
        // só navega se não houve drag (menos de 6px em qualquer direção)
        if (dx < 6 && dy < 6) {
            navigate(`/movie/${movie.id}`);
        }
    };

    return (
        <div
            className="card movie-card"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            role="link"
            tabIndex={0}
            aria-label={`Ver detalhes de ${movie.title}`}
            onKeyDown={(e) => e.key === "Enter" && navigate(`/movie/${movie.id}`)}
        >
            <div className="img-wrapper" style={backgroundImage ? { backgroundImage } : {}}>
                {!hasPoster && <i className="img-placeholder bi bi-file-person-fill"></i>}
            </div>
            <div className="card-body">
                <h3 className="card-title" title={movie.title}>
                    {movie.title}
                </h3>
            </div>

            <div className="badge-info">
                <span className="badge">{movie.original_language}</span>
                <span className="badge">{year}</span>
                <span className="badge show">
                    <i className="bi bi-star-fill"></i> {movie.rating.toFixed(1)}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;
