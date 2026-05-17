import { useState } from "react";
import { Link } from "react-router-dom";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { moviesOptions } from "@config/splideOptions";

// CSS
import "./Homepage.css";
import "../MoviesGrid.css";

// Components
import MovieCard from "@components/MovieCard/MovieCard";
import MovieCardSkeleton from "@components/MovieCard/MovieCard.skeleton";
import SlideArrows from "@components/SlideArrows";

// Hooks
import { useTrending } from "@hooks/useTrending";
import { useTopRated } from "@hooks/useTopRated";
import { useUpcoming } from "@hooks/useUpcoming";

const Homepage = () => {
    const [timeWindow, setTimeWindow] = useState<TimeWindow>("day");
    const { data: dateTrending, isLoading: isLoadingTrending, isError: isErrorTrending } = useTrending({ timeWindow });
    const moviesTrending = (dateTrending?.results ?? []).slice(0, 12);

    const { data: dateTopRated, isLoading: isLoadingTopRated, isError: isErrorTopRated } = useTopRated();
    const moviesTopRated = (dateTopRated?.results ?? []).slice(0, 12);

    const { data: dateUpcoming, isLoading: isLoadingUpcoming, isError: isErrorUpcoming } = useUpcoming({});
    const moviesUpcoming = (dateUpcoming?.results ?? []).slice(0, 12);

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
                <div className="d-flex">
                    <p className="flex-fill">
                        {timeWindow == "day" ? "What’s been trending over the past week" : "What’s trending right now"}
                    </p>
                    <Link className="btn btn-link" to="/">
                        See all <i className="bi bi-arrow-right"></i>
                    </Link>
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
                            moviesTrending.map((movie) => (
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
                    <Link className="btn btn-link" to="/">
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
                            moviesTopRated.map((movie) => (
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
                            moviesUpcoming.map((movie) => (
                                <SplideSlide key={movie.id}>
                                    <MovieCard movie={movie} />
                                </SplideSlide>
                            ))}
                    </SplideTrack>
                    <SlideArrows />
                </Splide>
            </section>
        </div>
    );
};

export default Homepage;
