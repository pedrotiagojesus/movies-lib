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
import { MovieCreditsMapped, MovieCrewMember } from "@typesLocal/movie.types";

const Movie = () => {
    const { id } = useParams();

    let { data: movie, isLoading, isError } = useMovie(id!);
// isLoading = true;

    const credits: MovieCreditsMapped | null = movie?.credits ?? null;
    const cast = credits?.cast ?? [];

    const writing: MovieCrewMember[] = movie?.credits?.crew?.writing ?? [];
    const directing: MovieCrewMember[] = movie?.credits?.crew?.directing ?? [];

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
                    <div id="movie-banner">
                        <div
                            className="overlay"
                            style={{
                                backgroundImage: movie.banner_url
                                    ? `url(${movie.banner_url})`
                                    : movie.poster_url
                                      ? `url(${movie.poster_url})`
                                      : "linear-gradient(135deg, #111, #333)",
                                filter: movie.banner_url ? "none" : "blur(8px)",
                                backgroundPosition: movie.banner_url ? "center top" : "center",
                            }}
                        ></div>
                        <div className="container banner-content">
                            <div className="banner-header">
                                {movie.external_ids && (
                                    <div className="external-links d-flex gap-3 flex-wrap">
                                        {movie.external_ids.imdb && (
                                            <a
                                                href={movie.external_ids.imdb}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="external-link"
                                            >
                                                <i className="bi bi-film"></i>
                                            </a>
                                        )}

                                        {movie.external_ids.wikidata && (
                                            <a
                                                href={movie.external_ids.wikidata}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="external-link"
                                            >
                                                <i className="bi bi-wikipedia"></i>
                                            </a>
                                        )}

                                        {movie.external_ids.facebook && (
                                            <a
                                                href={movie.external_ids.facebook}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="external-link"
                                            >
                                                <i className="bi bi-facebook"></i>
                                            </a>
                                        )}

                                        {movie.external_ids.instagram && (
                                            <a
                                                href={movie.external_ids.instagram}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="external-link"
                                            >
                                                <i className="bi bi-instagram"></i>
                                            </a>
                                        )}

                                        {movie.external_ids.twitter && (
                                            <a
                                                href={movie.external_ids.twitter}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="external-link"
                                            >
                                                <i className="bi bi-twitter"></i>
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="banner-footer">
                                <h1 className="title">{movie?.title}</h1>
                                {movie?.tagline && <p className="tagline mb-3">{movie?.tagline}</p>}
                                <p className="genres">
                                    {movie.genres.map((genre) => (
                                        <Link key={genre.id} to={`/search?genre=${genre.id}`} className="genre">
                                            {genre.name}
                                        </Link>
                                    ))}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="container content">
                        <div className="row mb-3">
                            <div className="col">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <img
                                            src={`${movie.poster_url}`}
                                            alt={movie.title}
                                            className="img-fluid mb-3 mb-md-4"
                                            style={{
                                                boxShadow: `0 0 25px 0px ${dominantColor}`,
                                            }}
                                        />
                                    </div>
                                    <div className="col-sm-8">
                                        <div className="movie-meta">
                                            {runtime.show && (
                                                <>
                                                    <span className="meta-item">
                                                        <i className="bi bi-clock-fill"></i> {runtime.hours}h{" "}
                                                        {runtime.minutes}m
                                                    </span>
                                                    <span className="separator">•</span>
                                                </>
                                            )}

                                            <span className="meta-item">
                                                <i className="bi bi-calendar2-event-fill"></i>{" "}
                                                {date(movie.release_date)}
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

                                            {movie.release_dates?.certification && (
                                                <>
                                                    <span className="separator">•</span>
                                                    <span className="meta-item">
                                                        <i className="bi bi-shield-fill-exclamation"></i>{" "}
                                                        <abbr title={movie.release_dates.description || ""}>
                                                            {movie.release_dates.certification}
                                                        </abbr>
                                                    </span>
                                                </>
                                            )}

                                            {movie.language && (
                                                <>
                                                    <span className="separator">•</span>
                                                    <span className="meta-item">
                                                        <i className="bi bi-translate"></i>{" "}
                                                        {movie.language.toUpperCase()}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                        <div className="rating">
                                            <Rating rating={movie?.rating || 0} />
                                        </div>

                                        <div className="movie-overview mb-4">{movie.overview}</div>

                                        {movie.trailer && (
                                            <>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary mb-4"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#trailerModal"
                                                >
                                                    <i className="bi bi-play-circle"></i> Watch Trailer
                                                </button>
                                            </>
                                        )}
                                    </div>
                                    <div className="col">
                                        {movie.reviews && movie.reviews.length > 0 && (
                                            <div className="movie-reviews mb-4">
                                                <h3 className="title">Reviews</h3>

                                                {movie.reviews.slice(0, 2).map((review) => (
                                                    <ReviewCard key={review.id} review={review} />
                                                ))}

                                                <button
                                                    className="btn btn-link"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#reviewsModal"
                                                >
                                                    See all reviews <i className="bi bi-chevron-right"></i>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-3">
                                {credits && (
                                    <>
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
                                        <div className="list-group movie-credits mb-4">
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
                                    </>
                                )}
                                {movie.keywords && movie.keywords.length > 0 && (
                                    <div className="movie-keywords mb-4">
                                        <h3 className="title">Themes</h3>
                                        <div className="keyword-list">
                                            {movie.keywords.slice(0, 10).map((keyword) => (
                                                <Link
                                                    key={keyword.id}
                                                    to={`/search?keyword=${keyword.id}`}
                                                    className="keyword"
                                                >
                                                    {keyword.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {movie.collection && (
                                    <div className="movie-collection mb-4">
                                        <h3 className="title">Collection</h3>
                                        <div className="movie-collection mb-4 d-flex flex-wrap align-items-center gap-3">
                                            <Link
                                                to={`/collection/${movie.collection.id}`}
                                                className="collection-link d-flex"
                                            >
                                                <div className="ratio ratio-2x3 collection-poster-wrapper">
                                                    <img
                                                        src={movie.collection.poster_url || undefined}
                                                        alt={movie.collection.name}
                                                        className="collection-poster"
                                                        style={{
                                                            boxShadow: `0 0 15px 0px ${dominantColor}`,
                                                        }}
                                                    />
                                                </div>
                                            </Link>

                                            <div className="collection-info">
                                                <h4 className="mb-1">{movie.collection.name}</h4>
                                                <Link
                                                    to={`/collection/${movie.collection.id}`}
                                                    className="btn btn-sm btn-outline-primary"
                                                >
                                                    View Collection
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {movie.watch_providers && (
                                    <div className="movie-watch mb-4">
                                        <h3 className="title">Where to Watch</h3>

                                        {/* Streaming */}
                                        {movie.watch_providers.flatrate && movie.watch_providers.flatrate.length > 0 && (
                                            <div className="provider-group">
                                                <h5 className="provider-label">Streaming</h5>
                                                <div className="provider-list">
                                                    {movie.watch_providers.flatrate.map((p) =>
                                                        p.logo && (
                                                            <div key={p.provider_id} className="provider-item">
                                                                <img
                                                                    src={p.logo}
                                                                    alt={p.provider_name}
                                                                    className="provider-logo"
                                                                />
                                                            </div>
                                                        )
                                                    )}

                                                </div>
                                            </div>
                                        )}

                                        {/* Rent */}
                                        {movie.watch_providers.rent && movie.watch_providers.rent.length > 0 && (
                                            <div className="provider-group">
                                                <h5 className="provider-label">Rent</h5>
                                                <div className="provider-list">
                                                    {movie.watch_providers.rent.map((p) =>
                                                        p.logo && (
                                                            <div key={p.provider_id} className="provider-item">
                                                                <img
                                                                    src={p.logo}
                                                                    alt={p.provider_name}
                                                                    className="provider-logo"
                                                                />
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Buy */}
                                        {movie.watch_providers.buy && movie.watch_providers.buy.length > 0 && (
                                            <div className="provider-group">
                                                <h5 className="provider-label">Buy</h5>
                                                <div className="provider-list">
                                                    {movie.watch_providers.buy.map((p) =>
                                                        p.logo && (
                                                            <div key={p.provider_id} className="provider-item">
                                                                <img
                                                                    src={p.logo}
                                                                    alt={p.provider_name}
                                                                    className="provider-logo"
                                                                />
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Link oficial */}
                                        {movie.watch_providers.link && (
                                            <a
                                                href={movie.watch_providers.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-sm btn-outline-primary mt-2 w-100"
                                            >
                                                View on JustWatch
                                            </a>
                                        )}
                                    </div>
                                )}

                                {!movie.watch_providers && (
                                    <div className="movie-watch mb-4">
                                        <h3 className="title">Where to Watch</h3>
                                        <p className="text-muted small">
                                            No streaming information available for your region.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                        {movie.recommendations && movie.recommendations.length > 0 && (
                            <div className="mb-4">
                                <h2 className="title">Recommendations</h2>
                                <Splide options={moviesOptions} hasTrack={false} className="movie-slide">
                                    <SplideTrack>
                                        {movie.recommendations.map((movie) => (
                                            <SplideSlide key={movie.id}>
                                                <MovieCard movie={movie} />
                                            </SplideSlide>
                                        ))}
                                    </SplideTrack>
                                    <SlideArrows />
                                </Splide>
                            </div>
                        )}
                        {movie.similar && movie.similar.length > 0 && (
                            <div className="mb-4">
                                <h2 className="title">Similar Movies</h2>
                                <Splide options={moviesOptions} hasTrack={false} className="movie-slide">
                                    <SplideTrack>
                                        {movie.similar.map((movie) => (
                                            <SplideSlide key={movie.id}>
                                                <MovieCard movie={movie} />
                                            </SplideSlide>
                                        ))}
                                    </SplideTrack>
                                    <SlideArrows />
                                </Splide>
                            </div>
                        )}
                    </div>

                    {movie?.trailer && (
                        <Modal id="trailerModal" size="xl">
                            <div className="ratio ratio-16x9">
                                <YouTubeModal url={movie.trailer} id="trailerModal" />
                            </div>
                        </Modal>
                    )}

                    {movie.reviews && movie.reviews.length > 0 && (
                        <ReviewsModal id="reviewsModal" title="Reviews" reviews={movie.reviews} />
                    )}

                    {credits && (
                        <>
                            <MovieCreditsModal id="creditsModal" title="Credits" credits={credits} />

                            {directing.length > 0 && directingDept && (
                                <MovieCreditsModal
                                    id="directorsModal"
                                    title={directingDept.name}
                                    credits={credits}
                                    filterDepartment="directing"
                                />
                            )}

                            {writing.length > 0 && writingDept && (
                                <MovieCreditsModal
                                    id="writingModal"
                                    title={writingDept.name}
                                    credits={credits}
                                    filterDepartment="writing"
                                />
                            )}

                            {credits.cast && (
                                <MovieCreditsModal id="castModal" title="Cast" credits={credits} showCastOnly />
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Movie;
