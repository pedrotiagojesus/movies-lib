import { useState } from "react";
import { Link } from "react-router-dom";

// CSS
import "./Home.css";
import "./MoviesGrid.css";

// Components
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
// import Pagination from "../components/Pagination";
// import SelectBoxSortBy from "../components/SelectBoxSortBy";
// import FilterTrigger from "../components/Modal/FilterTrigger";
// import Filter from "../components/Modal/Filter";

// Hooks
import { useTrending } from "@hooks/useTrending";
import { useTopRated } from "@hooks/useTopRated";
import { useUpcoming } from "@hooks/useUpcoming";

const Home = () => {
    const [timeWindow, setTimeWindow] = useState<TimeWindow>("day");
    const { data: dateTrending, isLoading: isLoadingTrending, isError: isErrorTrending } = useTrending({ timeWindow });
    const moviesTrending = (dateTrending?.results ?? []).slice(0, 6);

    const { data: dateTopRated, isLoading: isLoadingTopRated, isError: isErrorTopRated } = useTopRated();
    const moviesTopRated = (dateTopRated?.results ?? []).slice(0, 6);

    const { data: dateUpcoming, isLoading: isLoadingUpcoming, isError: isErrorUpcoming } = useUpcoming();
    const moviesUpcoming = (dateUpcoming?.results ?? []).slice(0, 6);

    return (
        <div id="homepage">
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
                                Profile
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
                <div className="movies-container row">
                    {moviesTrending && moviesTrending.length === 0 && isLoadingTrending && <Loading />}
                    {moviesTrending && moviesTrending.length === 0 && !isLoadingTrending && <p>No results</p>}
                    {moviesTrending.length > 0 &&
                        moviesTrending.map((movie) => (
                            <div key={movie.id} className="col-6 col-md-4 col-lg-3 col-xxl-2">
                                <MovieCard movie={movie} />
                            </div>
                        ))}
                </div>
            </section>
            <section>
                <h2 className="title">Top Rated</h2>
                <div className="d-flex">
                    <p className="flex-fill">Top rated</p>
                    <Link className="btn btn-link" to="/">
                        See all <i className="bi bi-arrow-right"></i>
                    </Link>
                </div>
                <div className="movies-container row">
                    {moviesTopRated && moviesTopRated.length === 0 && isLoadingTopRated && <Loading />}
                    {moviesTopRated && moviesTopRated.length === 0 && !isLoadingTopRated && <p>No results</p>}
                    {moviesTopRated.length > 0 &&
                        moviesTopRated.map((movie) => (
                            <div key={movie.id} className="col-6 col-md-4 col-lg-3 col-xxl-2">
                                <MovieCard movie={movie} />
                            </div>
                        ))}
                </div>
            </section>
            <section>
                <h2 className="title">Upcoming</h2>
                <div className="d-flex">
                    <p className="flex-fill">Upcoming</p>
                    <Link className="btn btn-link" to="/">
                        See all <i className="bi bi-arrow-right"></i>
                    </Link>
                </div>
                <div className="movies-container row">
                    {moviesUpcoming && moviesUpcoming.length === 0 && isLoadingTopRated && <Loading />}
                    {moviesUpcoming && moviesUpcoming.length === 0 && !isLoadingTopRated && <p>No results</p>}
                    {moviesUpcoming.length > 0 &&
                        moviesUpcoming.map((movie) => (
                            <div key={movie.id} className="col-6 col-md-4 col-lg-3 col-xxl-2">
                                <MovieCard movie={movie} />
                            </div>
                        ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
