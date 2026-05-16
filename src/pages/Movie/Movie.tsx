import { useParams } from "react-router-dom";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { moviesOptions } from "@config/splideOptions";

// CSS
import "./Movie.css";

// Components
import Modal from "../../components/Modal/Modal";
import YouTubeModal from "../../components/YouTubeModal";
import MovieImageModal from "../../components/MovieImageModal";
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

const Movie = () => {
    const { id } = useParams();

    const { data: movie } = useMovie(id!);

    const credits: MovieCredits | undefined = movie?.credits;
    const cast = credits?.cast ?? [];

    const writing: MovieCrew[] = movie?.credits?.crew?.writing ?? [];
    const directing: MovieCrew[] = movie?.credits?.crew?.directing ?? [];

    const runtime = minutesToHoursMinutes(movie?.runtime);

    return (
        <div id="movie-page">
            {!movie && <MovieSkeleton />}
            {movie && (
                <>
                    <div
                        id="movie-banner"
                        className="d-none d-md-flex"
                        style={{
                            backgroundImage: `url(${movie?.banner_url})`,
                        }}
                    >
                        <div className="container">
                            <h1 className="title">{movie?.title}</h1>
                            <p className="tagline mb-3">{movie?.tagline}</p>
                            <p className="genres">
                                {movie.genres.map((genre) => (
                                    <span key={genre.id} className="genre">
                                        {genre.name}
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>

                    <div className="container content">
                        <h2 className="title d-md-none">{movie.title}</h2>
                        <p className="tagline d-md-none">{movie.tagline}</p>
                        <div className="row mb-3">
                            <div className="col-sm-3">
                                <MovieImageModal movie={movie} />

                                {movie.trailer && (
                                    <>
                                        <button
                                            type="button"
                                            className="btn btn-primary mt-5"
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
                                    <span className="meta-item">
                                        <i className="bi bi-star-fill"></i> {movie.rating.toFixed(1)}
                                    </span>

                                    <span className="separator">•</span>

                                    <span className="meta-item">
                                        <i className="bi bi-clock-fill"></i> {runtime.hours}h {runtime.minutes}m
                                    </span>

                                    <span className="separator">•</span>

                                    <span className="meta-item">
                                        <i className="bi bi-calendar2-event-fill"></i> {date(movie.release_date)}
                                    </span>

                                    {movie.budget > 0 && (
                                        <>
                                            <span className="separator">•</span>
                                            <span className="meta-item">
                                                <i className="bi bi-wallet2"></i> {currency(movie.budget)}
                                            </span>
                                        </>
                                    )}

                                    {movie.revenue > 0 && (
                                        <>
                                            <span className="separator">•</span>
                                            <span className="meta-item">
                                                <i className="bi bi-graph-up"></i> {currency(movie.revenue)}
                                            </span>
                                        </>
                                    )}
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
                                    {directing && (
                                        <button
                                            className="list-group-item list-group-item-action"
                                            data-bs-toggle="modal"
                                            data-bs-target="#directorsModal"
                                        >
                                            <div>
                                                <h4>Director</h4>
                                                {directing.slice(0, 3).map((person, i) => (
                                                    <span key={i}>
                                                        {person.name}
                                                        {i < directing.length - 1 && " • "}
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="bi bi-chevron-compact-right"></span>
                                        </button>
                                    )}
                                    {writing && (
                                        <button
                                            className="list-group-item list-group-item-action"
                                            data-bs-toggle="modal"
                                            data-bs-target="#writingModal"
                                        >
                                            <div>
                                                <h4>Writing</h4>
                                                {writing.slice(0, 3).map((person, i) => (
                                                    <span key={i}>
                                                        {person.name}
                                                        {i < writing.length - 1 && " • "}
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="bi bi-chevron-compact-right"></span>
                                        </button>
                                    )}
                                    {cast && (
                                        <button
                                            className="list-group-item list-group-item-action"
                                            data-bs-toggle="modal"
                                            data-bs-target="#castModal"
                                        >
                                            <div>
                                                <h4>Stars</h4>
                                                {cast.slice(0, 3).map((person, i) => (
                                                    <span key={i}>
                                                        {person.name}
                                                        {i < cast.length - 1 && " • "}
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
                            <h1 className="title">Recommendations</h1>
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

                    {movie.reviews && <ReviewsModal id="reviewsModal" title="Reviews" reviews={movie.reviews} />}

                    {credits && <MovieCreditsModal id="creditsModal" title="Credits" credits={credits} />}

                    {writing && credits?.departments.find((d) => d.code === "directing") && (
                        <MovieCreditsModal
                            id="directorsModal"
                            title={credits.departments.find((d) => d.code === "directing")!.name}
                            credits={credits}
                            filterDepartment="directing"
                        />
                    )}

                    {writing && credits?.departments.find((d) => d.code === "writing") && (
                        <MovieCreditsModal
                            id="writingModal"
                            title={credits.departments.find((d) => d.code === "writing")!.name}
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
