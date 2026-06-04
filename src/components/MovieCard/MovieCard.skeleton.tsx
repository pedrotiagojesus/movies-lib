// CSS
import "./MovieCard.css";

const MovieCardSkeleton = () => {
    return (
        <div className="card movie-card placeholder-glow">
            <div className="img-wrapper placeholder"></div>
            <div className="card-body">
                <h3 className="card-title placeholder"></h3>
                <h3 className="card-title placeholder"></h3>
            </div>
        </div>
    );
};

export default MovieCardSkeleton;
