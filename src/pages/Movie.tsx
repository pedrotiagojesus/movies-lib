import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Slider
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

// CSS
import "./Movie.css";

// Components
import PersonCard from "../components/PersonCard";

// Configs
import { sliderOptions, sliderImageOptions, sliderVideoOptions } from "../config/splideOptions";

// Endpoints
import { MOVIES_API } from "../api/endpoints";
import { IMAGE_SIZE_W500 } from "../config/tmbd";
import SlideArrows from "../components/SlideArrows";

const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [movieCast, setMovieCast] = useState<MovieCast[]>([]);
    const [movieCrew, setMovieCrew] = useState<MovieCrew[]>([]);
    const [movieImage, setMovieImage] = useState<MovieImageBackdrop[]>([]);
    const [movieVideo, setMovieVideo] = useState<MovieVideo[]>([]);

    const formatCurrency = (number: number) => {
        return number.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    };

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

        setMovieImage(data.backdrops);
    };

    // Get Movie Video
    const getMovieVideo = async (id: number) => {
        const res = await fetch(MOVIES_API.movieVideos(id));
        const data: MovieVideosResponse = await res.json();

        const allowType = ["Trailer", "Teaser"];
        const items = data.results.filter(
            (item: MovieVideo) => item.site === "YouTube" && allowType.includes(item.type)
        );

        setMovieVideo(items);
    };

    useEffect(() => {
        if (!id) return;
        getMovie(Number(id));
        getMovieCredit(Number(id));
        getMovieImage(Number(id));
        getMovieVideo(Number(id));
    }, [id]);

    const renderVideo = (video: MovieVideo) => {
        return (
            <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.key}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="mw-100"
            ></iframe>
        );
    };

    return (
        <div id="movie-page" className="container">
            {movie && (
                <>
                    <h2 className="title d-md-none">{movie.title}</h2>
                    <p className="tagline d-md-none">{movie.tagline}</p>
                    <div className="row">
                        <div className="col-md-4">
                            <img
                                src={`${IMAGE_SIZE_W500}${movie.poster_path}`}
                                alt={movie.title}
                                className="img-fluid mb-3 mb-md-0"
                            />
                        </div>
                        <div className="col-md-8">
                            <h2 className="title d-none d-md-block">{movie.title}</h2>
                            <p className="tagline d-none d-md-block">{movie.tagline}</p>
                            {movie.genres && (
                                <div className="genres">
                                    {movie.genres.map((genre) => (
                                        <span key={genre.id} className="genre">
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            )}
                            <div className="list-info">
                                <div className="info">
                                    <h5>
                                        <i className="bi bi-wallet2 icon"></i> Budget
                                    </h5>
                                    <p>{formatCurrency(movie.budget)}</p>
                                </div>
                                <div className="info">
                                    <h5>
                                        <i className="bi bi-graph-up icon"></i> Revenue
                                    </h5>
                                    <p>{formatCurrency(movie.revenue)}</p>
                                </div>
                                <div className="info">
                                    <h5>
                                        <i className="bi bi-hourglass-split icon"></i> Runtime
                                    </h5>
                                    <p>{movie.runtime} minutes</p>
                                </div>
                                <div className="info">
                                    <h5>
                                        <i className="bi bi-calendar-date icon"></i> Release date
                                    </h5>
                                    <p>{movie.release_date}</p>
                                </div>
                            </div>
                            <div className="info description">
                                <h5>Overview</h5>
                                <p>{movie.overview} </p>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div className="movie-details">
                {movieImage.length > 0 && (
                    <div className="image">
                        <h2 className="title">Images</h2>
                        <Splide
                            aria-label="Images"
                            className="image-container"
                            options={sliderImageOptions}
                            hasTrack={false}
                        >
                            <SplideTrack>
                                {movieImage.map((image, i) => (
                                    <SplideSlide key={`image-${i}`}>
                                        <img
                                            src={`${IMAGE_SIZE_W500}${image.file_path}`}
                                            alt={`image-${i}`}
                                            className="img-fluid"
                                        />
                                    </SplideSlide>
                                ))}
                            </SplideTrack>
                            <SlideArrows />
                        </Splide>
                    </div>
                )}

                {movieVideo.length > 0 && (
                    <div className="video">
                        <h2 className="title">Videos</h2>
                        <Splide
                            aria-label="Video"
                            className="video-container"
                            options={sliderVideoOptions}
                            hasTrack={false}
                        >
                            <SplideTrack>
                                {movieVideo.map((video, i) => (
                                    <SplideSlide key={`video-${i}`}>{renderVideo(video)}</SplideSlide>
                                ))}
                            </SplideTrack>
                            <SlideArrows />
                        </Splide>
                    </div>
                )}

                {movieCast.length > 0 && (
                    <div className="movie-cast">
                        <h2 className="title">Cast</h2>
                        <Splide aria-label="Cast" className="credit-container" options={sliderOptions} hasTrack={false}>
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
                        <Splide aria-label="Crew" className="credit-container" options={sliderOptions} hasTrack={false}>
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
    );
};

export default Movie;
