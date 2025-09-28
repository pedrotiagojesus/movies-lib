import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Slider
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

// CSS
import "./Movie.css";

// Components
import PersonCard from "../components/PersonCard";
import SlideArrows from "../components/SlideArrows";

// Configs
import { sliderOptions } from "../config/splideOptions";

// Endpoints
import { MOVIES_API } from "../api/endpoints";

// Utils
import { currency, date } from "../utils/format";
import Modal from "../components/Modal";
import YouTubeModal from "../components/YouTubeModal";
import MovieImageModal from "../components/MovieImageModal";

const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [movieCast, setMovieCast] = useState<MovieCast[]>([]);
    const [movieCrew, setMovieCrew] = useState<MovieCrew[]>([]);
    const [movieImage, setMovieImage] = useState<MovieImageBackdrop[]>([]);
    const [movieVideo, setMovieVideo] = useState<MovieVideo | null>(null);

    // Get Movie
    const getMovie = async (id: number) => {
        const res = await fetch(MOVIES_API.movie(id));
        const data: Movie = await res.json();

        setMovie(data);
    };

    // Get Movie Credits
    const getMovieCredit = async (id: number) => {
        const res = await fetch(MOVIES_API.movieCredits(id));
        const data: MovieCreditsResponse = await res.json();

        setMovieCast(data.cast);
        setMovieCrew(data.crew);
    };

    // Get Movie Images
    const getMovieImage = async (id: number) => {
        const res = await fetch(MOVIES_API.movieImages(id));
        const data: MovieImagesResponse = await res.json();

        const backdrops = data.backdrops.filter((img) => img.vote_average > 0);
        const posters = data.posters.filter((img) => img.vote_average > 0);

        const allImages = [...backdrops, ...posters];

        setMovieImage(allImages);
    };

    // Get Movie Video
    const getMovieVideo = async (id: number) => {
        const res = await fetch(MOVIES_API.movieVideos(id));
        const data: MovieVideosResponse = await res.json();

        const trailers = data.results.filter((item: MovieVideo) => item.site === "YouTube" && item.type === "Trailer");

        if (trailers.length === 0) {
            setMovieVideo(null);
            return;
        }

        const sorted = trailers.sort((a, b) => {
            if (a.official !== b.official) return b.official ? 1 : -1;
            if (a.size !== b.size) return b.size - a.size;
            return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
        });

        const best = sorted[0];

        setMovieVideo(best);
    };

    useEffect(() => {
        if (!id) return;
        getMovie(Number(id));
        getMovieCredit(Number(id));
        getMovieImage(Number(id));
        getMovieVideo(Number(id));
    }, [id]);

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
