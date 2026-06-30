import { useState } from "react";
import { Link } from "react-router-dom";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { moviesOptions } from "@config/splideOptions";

// CSS
import "./Homepage.css";

// Components
import MovieCard from "@components/MovieCard/MovieCard";
import MovieCardSkeleton from "@components/MovieCard/MovieCard.skeleton";
import SlideArrows from "@components/SlideArrows";

// Hooks
import { useTrending } from "@hooks/useTrending";
import { useTopRated } from "@hooks/useTopRated";
import { useUpcoming } from "@hooks/useUpcoming";
import { useBestOfMovies } from "@hooks/useBestOfMovies";
import { useGenres } from "@hooks/useGenres";

// Types
import { MovieListItemMapped } from "@typesLocal/moviesList.types";
import { TimeWindow } from "@typesLocal/index.types";
import { MoviesMapped } from "@typesLocal/genres.type";
import Modal from "@components/Modal/Modal";
import { closeBootstrapModal } from "@utils/modal";

const Homepage = () => {
    const currentYear = new Date().getFullYear();

    const [timeWindow, setTimeWindow] = useState<TimeWindow>("day");
    const { data: dateTrending, isLoading: isLoadingTrending, isError: isErrorTrending } = useTrending({ timeWindow });
    const moviesTrending = (dateTrending?.results ?? []).slice(0, 12);

    const { data: dateTopRated, isLoading: isLoadingTopRated, isError: isErrorTopRated } = useTopRated();
    const moviesTopRated = (dateTopRated?.results ?? []).slice(0, 12);

    const { data: dateUpcoming, isLoading: isLoadingUpcoming, isError: isErrorUpcoming } = useUpcoming();
    const moviesUpcoming = (dateUpcoming?.results ?? []).slice(0, 12);

    const [bestOfMoviesYear, setBestOfMoviesYear] = useState<number | "">("");
    const [bestOfMoviesGenre, setBestOfMoviesGenre] = useState<number>(27);
    const {
        data: dataBestOfMovies,
        isLoading: isLoadingBestOfMovies,
        isError: isErrorBestOfMovies,
    } = useBestOfMovies({ with_genres: bestOfMoviesGenre, primary_release_year: bestOfMoviesYear });
    const moviesBestOf = (dataBestOfMovies?.results ?? []).slice(0, 12);

    const { data: dataGenres, isLoading: isLoadingGenres, isError: isErrorGenres } = useGenres();
    const YEARS = Array.from({ length: currentYear - 1870 + 1 }, (_, i) => currentYear - i);

    return (
        <div id="homepage" className="container">
            <section>
                <div className="d-flex trending-title">
                    <h2 className="title">Trending</h2>
                    <ul className="nav nav-pills" id="trending-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${timeWindow == "day" ? "active" : ""}`}
                                id="tranding-day-tab"
                                type="button"
                                role="tab"
                                onClick={() => setTimeWindow("day")}
                            >
                                Today
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${timeWindow == "week" ? "active" : ""}`}
                                id="tranding-week-tab"
                                type="button"
                                role="tab"
                                onClick={() => setTimeWindow("week")}
                            >
                                This week
                            </button>
                        </li>
                    </ul>
                </div>

                {moviesTrending && moviesTrending.length === 0 && !isLoadingTrending && <p>No results</p>}
                <Splide options={moviesOptions} hasTrack={false} className="movie-slide">
                    <SplideTrack>
                        {isLoadingTrending &&
                            Array.from({ length: 6 }).map((_, i) => (
                                <SplideSlide key={i}>
                                    <MovieCardSkeleton />
                                </SplideSlide>
                            ))}

                        {!isLoadingTrending &&
                            moviesTrending &&
                            moviesTrending.map((movie: MovieListItemMapped) => (
                                <SplideSlide key={movie.id}>
                                    <MovieCard movie={movie} />
                                </SplideSlide>
                            ))}
                    </SplideTrack>
                    <SlideArrows />
                </Splide>
            </section>

            <section>
                <h2 className="title">Top Rated</h2>
                <div className="d-flex">
                    <p className="flex-fill">Top rated</p>
                    <Link className="btn btn-link" to={`/movies-top-rated`}>
                        See all <i className="bi bi-arrow-right"></i>
                    </Link>
                </div>

                {moviesTopRated && moviesTopRated.length === 0 && !isLoadingTopRated && <p>No results</p>}
                <Splide options={moviesOptions} hasTrack={false} className="movie-slide">
                    <SplideTrack>
                        {isLoadingTopRated &&
                            Array.from({ length: 6 }).map((_, i) => (
                                <SplideSlide key={i}>
                                    <MovieCardSkeleton />
                                </SplideSlide>
                            ))}

                        {!isLoadingTopRated &&
                            moviesTopRated &&
                            moviesTopRated.map((movie: MovieListItemMapped) => (
                                <SplideSlide key={movie.id}>
                                    <MovieCard movie={movie} />
                                </SplideSlide>
                            ))}
                    </SplideTrack>
                    <SlideArrows />
                </Splide>
            </section>

            <section>
                <h2 className="title">Upcoming</h2>
                <div className="d-flex">
                    <p className="flex-fill">Upcoming</p>
                    <Link className="btn btn-link" to={`/movies-upcoming`}>
                        See all <i className="bi bi-arrow-right"></i>
                    </Link>
                </div>

                {moviesUpcoming && moviesUpcoming.length === 0 && !isLoadingUpcoming && <p>No results</p>}
                <Splide options={moviesOptions} hasTrack={false} className="movie-slide">
                    <SplideTrack>
                        {isLoadingUpcoming &&
                            Array.from({ length: 6 }).map((_, i) => (
                                <SplideSlide key={i}>
                                    <MovieCardSkeleton />
                                </SplideSlide>
                            ))}

                        {!isLoadingUpcoming &&
                            moviesUpcoming &&
                            moviesUpcoming.map((movie: MovieListItemMapped) => (
                                <SplideSlide key={movie.id}>
                                    <MovieCard movie={movie} />
                                </SplideSlide>
                            ))}
                    </SplideTrack>
                    <SlideArrows />
                </Splide>
            </section>

            <section>
                <h2 className="title d-flex align-items-center gap-2">
                    Best
                    <button
                        className="btn btn-link p-0 best-movies-genre"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#best-movies-genre"
                    >
                        {dataGenres?.find((g: MoviesMapped) => g.id === bestOfMoviesGenre)?.name || "Genre"}
                    </button>{" "}
                    Movies of {/* Year Dropdown */}
                    <div className="dropdown">
                        <button
                            className="btn btn-sm btn-link dropdown-toggle p-0"
                            type="button"
                            data-bs-toggle="dropdown"
                        >
                            {bestOfMoviesYear ? bestOfMoviesYear : "All time"}
                        </button>

                        <ul
                            className="dropdown-menu"
                            style={{
                                maxHeight: "200px",
                                overflowY: "auto",
                            }}
                        >
                            <li>
                                <button className="dropdown-item" onClick={() => setBestOfMoviesYear("")}>
                                    All time
                                </button>
                            </li>

                            {YEARS.map((year) => (
                                <li key={year}>
                                    <button className="dropdown-item" onClick={() => setBestOfMoviesYear(year)}>
                                        {year}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </h2>

                <div className="d-flex">
                    <p className="flex-fill">
                        Best {bestOfMoviesGenre} Movies {bestOfMoviesYear ? `of ${bestOfMoviesYear}` : "of All Time"}
                    </p>

                    <Link className="btn btn-link" to={`/best-of`}>
                        See all <i className="bi bi-arrow-right"></i>
                    </Link>
                </div>

                {moviesBestOf && moviesBestOf.length === 0 && !isLoadingBestOfMovies && <p>No results</p>}
                <Splide options={moviesOptions} hasTrack={false} className="movie-slide">
                    <SplideTrack>
                        {isLoadingBestOfMovies &&
                            Array.from({ length: 6 }).map((_, i) => (
                                <SplideSlide key={i}>
                                    <MovieCardSkeleton />
                                </SplideSlide>
                            ))}

                        {!isLoadingBestOfMovies &&
                            moviesBestOf &&
                            moviesBestOf.map((movie: MovieListItemMapped) => (
                                <SplideSlide key={movie.id}>
                                    <MovieCard movie={movie} />
                                </SplideSlide>
                            ))}
                    </SplideTrack>
                    <SlideArrows />
                </Splide>
            </section>

            <Modal id="best-movies-genre" title="Select genre">
                <div className="genre-list">
                    {dataGenres?.map((genre: MoviesMapped) => (
                        <span
                            className={`genre ${genre.id == bestOfMoviesGenre ? "active" : ""}`}
                            key={genre.id}
                            onClick={() => {
                                setBestOfMoviesGenre(genre.id);
                            }}
                            data-bs-dismiss="modal"
                        >
                            {genre.name}
                        </span>
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default Homepage;
