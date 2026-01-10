import { useParams } from "react-router-dom";

// Slider
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

// CSS
import "./Movie.css";

// Components
import PersonCard from "../components/PersonCard";
import SlideArrows from "../components/SlideArrows";
import Modal from "../components/Modal";
import YouTubeModal from "../components/YouTubeModal";
import MovieImageModal from "../components/MovieImageModal";

// Configs
import { sliderOptions } from "../config/splideOptions";

// Utils
import { currency, date } from "../utils/format";
import { useMovie } from "@hooks/useMovie";
import { useMovieCredits } from "@hooks/useMovieCredits";
import { useMovieImages } from "@hooks/useMovieImages";
import { useMovieVideo } from "@hooks/useMovieVideos";

const Movie = () => {
    const { id } = useParams();

    const { data: movie } = useMovie(id!);
    const { data: movieImage } = useMovieImages(id);
    const { data: movieVideo } = useMovieVideo(id);
    const { data: credits } = useMovieCredits(id);
    const movieCast = credits?.cast ?? [];
    const movieCrew = credits?.crew ?? [];

    return (
        <>
            <div id="movie-page" className="container">
                {movie && (
                    <>
                        <h2 className="title d-md-none">{movie.title}</h2>
                        <p className="tagline d-md-none">{movie.tagline}</p>
                        <div className="row mb-3">
                            <div className="col-sm-4">
                                <MovieImageModal movie={movie} movieImages={movieImage} />
                            </div>
                            <div className="col-sm-8">
                                <h2 className="title d-none d-md-block">{movie.title}</h2>
                                <p className="tagline d-none d-md-block">{movie.tagline}</p>
                                <div className="row">
                                    <div className="col-lg-4 col-xl-3">
                                        <div className="list-info">
                                            <div className="info">
                                                <h5>
                                                    <i className="bi bi-calendar-date"></i> Release date
                                                </h5>
                                                <p>{date(movie.release_date)}</p>
                                            </div>
                                            <div className="info">
                                                <h5>
                                                    <i className="bi bi-collection-play"></i> Genre
                                                </h5>
                                                <p className="genres">
                                                    {movie.genres.map((genre) => (
                                                        <span key={genre.id} className="genre">
                                                            {genre.name}
                                                        </span>
                                                    ))}
                                                </p>
                                            </div>
                                            {movie.budget > 0 && (
                                                <div className="info">
                                                    <h5>
                                                        <i className="bi bi-wallet2"></i> Budget
                                                    </h5>
                                                    <p>{currency(movie.budget)}</p>
                                                </div>
                                            )}
                                            {movie.revenue > 0 && (
                                                <div className="info">
                                                    <h5>
                                                        <i className="bi bi-graph-up"></i> Revenue
                                                    </h5>
                                                    <p>{currency(movie.revenue)}</p>
                                                </div>
                                            )}
                                            {movie.revenue > 0 && (
                                                <div className="info">
                                                    <h5>
                                                        <i className="bi bi-hourglass-split"></i> Runtime
                                                    </h5>
                                                    <p>{movie.runtime} minutes</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-8 col-xl-9">
                                        <div className="info description">
                                            <h5>Overview</h5>
                                            <p>{movie.overview} </p>

                                            {movieVideo && (
                                                <>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary mt-3"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#trailerModal"
                                                    >
                                                        <i className="bi bi-play-circle"></i> Watch Trailer
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <div className="movie-details">
                    {movieCast.length > 0 && (
                        <div className="movie-cast">
                            <h2 className="title">Cast</h2>
                            <Splide
                                aria-label="Cast"
                                className="credit-container"
                                options={sliderOptions}
                                hasTrack={false}
                            >
                                <SplideTrack>
                                    {movieCast.map((cast, i) => (
                                        <SplideSlide key={`cast-${i}`}>
                                            <PersonCard
                                                image={cast.profile_path}
                                                title={cast.character}
                                                subtitle={cast.name}
                                            />
                                        </SplideSlide>
                                    ))}
                                </SplideTrack>
                                <SlideArrows />
                            </Splide>
                        </div>
                    )}

                    {movieCrew.length > 0 && (
                        <div className="movie-crew">
                            <h2 className="title">Crew</h2>
                            <Splide
                                aria-label="Crew"
                                className="credit-container"
                                options={sliderOptions}
                                hasTrack={false}
                            >
                                <SplideTrack>
                                    {movieCrew.map((crew, i) => (
                                        <SplideSlide key={`crew-${i}`}>
                                            <PersonCard
                                                image={crew.profile_path}
                                                title={crew.name}
                                                subtitle={crew.department}
                                            />
                                        </SplideSlide>
                                    ))}
                                </SplideTrack>
                                <SlideArrows />
                            </Splide>
                        </div>
                    )}
                </div>
            </div>

            {movieVideo && (
                <Modal id="trailerModal" title={`${movie?.title} - Trailer`} size="xl">
                    <div className="ratio ratio-16x9">
                        <YouTubeModal videoKey={movieVideo.key} id="trailerModal" />
                    </div>
                </Modal>
            )}
        </>
    );
};

export default Movie;
