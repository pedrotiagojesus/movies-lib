import { useParams, Link } from "react-router-dom";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";

// CSS
import "./Movie.css";

// Components
import Modal from "../../components/Modal/Modal";
import YouTubeModal from "../../components/YouTubeModal";
import MovieCreditsModal from "@components/MovieCreditsModal/MovieCreditsModal";
import MovieCard from "@components/MovieCard/MovieCard";
import SlideArrows from "@components/SlideArrows";
import ReviewsModal from "@components/ReviewsModal/ReviewsModal";
import ReviewCard from "@components/ReviewCard/ReviewCard";
import MovieSkeleton from "./MovieSkeleton";

// Utils
import { currency, date, minutesToHoursMinutes } from "../../utils/format";

// Hooks
import { useMovie } from "@hooks/useMovie";
import { useDominantColor } from "@hooks/useDominantColor";

// Config
import { moviesOptions } from "@config/splideOptions";
import { Rating } from "@components/Rating/Rating";

const Movie = () => {
    const { id } = useParams();

    const { data: movie, isLoading, isError } = useMovie(id!);

    const credits: MovieCredits | undefined = movie?.credits;
    const cast = credits?.cast ?? [];

    const writing: MovieCrew[] = movie?.credits?.crew?.writing ?? [];
    const directing: MovieCrew[] = movie?.credits?.crew?.directing ?? [];

    const directingDept = credits?.departments.find((d) => d.code === "directing");
    const writingDept = credits?.departments.find((d) => d.code === "writing");

    const runtime = minutesToHoursMinutes(movie?.runtime);
    const dominantColor = useDominantColor(movie?.poster_url);

    return (
        <div id="movie-page">
            {isLoading && <MovieSkeleton />}
            {isError && (
                <div className="container content">
                    <div className="alert alert-danger mt-4" role="alert">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        Failed to load movie. Please try again later.
                    </div>
                </div>
            )}
            {movie && (
                <>
                    <div
                        id="movie-banner"
                        style={{
                            backgroundImage: `url(${movie?.banner_url})`,
                        }}
                    >
                        <div className="container">
                            <h1 className="title">{movie?.title}</h1>
                            <p className="tagline mb-3">{movie?.tagline}</p>
                            <p className="genres">
                                {movie.genres.map((genre) => (
                                    <Link key={genre.id} to={`/search?genre=${genre.id}`} className="genre">
                                        {genre.name}
                                    </Link>
                                ))}
                            </p>
                        </div>
                    </div>

                    <div className="container content">
                        <div className="row mb-3">
                            <div className="col-sm-3">
                                <img
                                    src={`${movie.poster_url}`}
                                    alt={movie.title}
                                    className="img-fluid mb-3 mb-md-0"
                                    style={{
                                        boxShadow: `0 0 25px 0px ${dominantColor}`,
                                    }}
                                />

                                {movie.trailer && (
                                    <>
                                        <button
                                            type="button"
                                            className="btn btn-primary mt-4"
                                            data-bs-toggle="modal"
                                            data-bs-target="#trailerModal"
                                        >
                                            <i className="bi bi-play-circle"></i> Watch Trailer
                                        </button>
                                    </>
                                )}
                            </div>
                            <div className="col-sm-6">
                                <div className="movie-meta">
                                    {runtime.show && (
                                        <>
                                            <span className="meta-item">
                                                <i className="bi bi-clock-fill"></i> {runtime.hours}h {runtime.minutes}m
                                            </span>
                                            <span className="separator">•</span>
                                        </>
                                    )}

                                    <span className="meta-item">
                                        <i className="bi bi-calendar2-event-fill"></i> {date(movie.release_date)}
                                    </span>

                                    {movie.budget > 0 && (
                                        <>
                                            <span className="separator">•</span>
                                            <span className="meta-item">
                                                <i className="bi bi-wallet2"></i> {currency(movie.budget, 0)}
                                            </span>
                                        </>
                                    )}

                                    {movie.revenue > 0 && (
                                        <>
                                            <span className="separator">•</span>
                                            <span className="meta-item">
                                                <i className="bi bi-graph-up"></i> {currency(movie.revenue, 0)}
                                            </span>
                                        </>
                                    )}
                                </div>
                                <div className="rating">
                                    <Rating rating={movie?.rating || 0} />
                                </div>

                                <div className="movie-overview">{movie.overview}</div>

                                {movie.reviews && movie.reviews.length > 0 && (
                                    <div className="movie-reviews mt-4">
                                        <h3 className="title">Reviews</h3>

                                        {movie.reviews.slice(0, 2).map((review) => (
                                            <ReviewCard key={review.id} review={review} />
                                        ))}

                                        <button
                                            className="btn btn-link mt-2"
                                            data-bs-toggle="modal"
                                            data-bs-target="#reviewsModal"
                                        >
                                            See all reviews <i className="bi bi-chevron-right"></i>
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="col-sm-3">
                                <div className="d-flex justify-content-between">
                                    <h3 className="title">Credits</h3>

                                    <button
                                        className="btn btn-link"
                                        data-bs-toggle="modal"
                                        data-bs-target="#creditsModal"
                                    >
                                        See all
                                    </button>
                                </div>
                                <div className="list-group movie-credits">
                                    {directing.length > 0 && (
                                        <button
                                            className="list-group-item list-group-item-action"
                                            data-bs-toggle="modal"
                                            data-bs-target="#directorsModal"
                                        >
                                            <div>
                                                <span className="credits-label">Director</span>
                                                {directing.slice(0, 3).map((person, i) => (
                                                    <span key={i}>
                                                        {person.name}
                                                        {i < Math.min(directing.length, 3) - 1 && " • "}
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="bi bi-chevron-compact-right"></span>
                                        </button>
                                    )}
                                    {writing.length > 0 && (
                                        <button
                                            className="list-group-item list-group-item-action"
                                            data-bs-toggle="modal"
                                            data-bs-target="#writingModal"
                                        >
                                            <div>
                                                <span className="credits-label">Writing</span>
                                                {writing.slice(0, 3).map((person, i) => (
                                                    <span key={i}>
                                                        {person.name}
                                                        {i < Math.min(writing.length, 3) - 1 && " • "}
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="bi bi-chevron-compact-right"></span>
                                        </button>
                                    )}
                                    {cast.length > 0 && (
                                        <button
                                            className="list-group-item list-group-item-action"
                                            data-bs-toggle="modal"
                                            data-bs-target="#castModal"
                                        >
                                            <div>
                                                <span className="credits-label">Stars</span>
                                                {cast.slice(0, 3).map((person, i) => (
                                                    <span key={i}>
                                                        {person.name}
                                                        {i < Math.min(cast.length, 3) - 1 && " • "}
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="bi bi-chevron-compact-right"></span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="title">Recommendations</h2>
                            <Splide options={moviesOptions} hasTrack={false} className="movie-slide">
                                <SplideTrack>
                                    {movie.recommendations.results.map((movie) => (
                                        <SplideSlide key={movie.id}>
                                            <MovieCard movie={movie} />
                                        </SplideSlide>
                                    ))}
                                </SplideTrack>
                                <SlideArrows />
                            </Splide>
                        </div>
                    </div>

                    {movie?.trailer && (
                        <Modal id="trailerModal" size="xl">
                            <div className="ratio ratio-16x9">
                                <YouTubeModal url={movie.trailer} id="trailerModal" />
                            </div>
                        </Modal>
                    )}

                    {movie.reviews.length > 0 && (
                        <ReviewsModal id="reviewsModal" title="Reviews" reviews={movie.reviews} />
                    )}

                    {credits && <MovieCreditsModal id="creditsModal" title="Credits" credits={credits} />}

                    {credits && directing.length > 0 && directingDept && (
                        <MovieCreditsModal
                            id="directorsModal"
                            title={directingDept.name}
                            credits={credits}
                            filterDepartment="directing"
                        />
                    )}

                    {credits && writing.length > 0 && writingDept && (
                        <MovieCreditsModal
                            id="writingModal"
                            title={writingDept.name}
                            credits={credits}
                            filterDepartment="writing"
                        />
                    )}

                    {credits?.cast && (
                        <MovieCreditsModal id="castModal" title="Cast" credits={credits} showCastOnly={true} />
                    )}
                </>
            )}
        </div>
    );
};

export default Movie;
