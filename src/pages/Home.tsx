import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// CSS
import "./MoviesGrid.css";

// Components
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import SelectBoxSortBy from "../components/SelectBoxSortBy";
import FilterTrigger from "../components/Modal/FilterTrigger";
import Filter from "../components/Modal/Filter";

// Hooks
import { useMovies } from "../hooks/useMovies";

// Env
const viteBaseApi = import.meta.env.VITE_BASE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
    const [sortBy, setSortBy] = useState<"popularity" | "release_date" | "vote_average">("popularity");
    const [sortByDirection, setSortByDirection] = useState<"asc" | "desc">("desc");

    const [searchParams] = useSearchParams();
    const page = searchParams.get("page");
    const genre = searchParams.get("genre");

    const { movies, totalPages, loading, error, getMovies } = useMovies();

    useEffect(() => {
        const params = new URLSearchParams();

        if (page) params.append("page", page);
        if (genre) params.append("with_genres", genre);

        params.append("sort_by", `${sortBy}.${sortByDirection}`);

        const apiUrl = `${viteBaseApi}discover/movie?${apiKey}&${params.toString()}`;
        getMovies(apiUrl);
    }, [page, genre, sortBy, sortByDirection]);

    const handleSelectSortBy = (value: typeof sortBy) => setSortBy(value);
    const handleSelectSortByDirection = (value: typeof sortByDirection) => setSortByDirection(value);

    return (
        <div id="homepage">
            <div className="d-flex">
                <div className="flex-fill">
                    <h2 className="title">Movies</h2>
                    <p>List all movies.</p>
                </div>
                <div className="d-flex align-items-start gap-3">
                    <FilterTrigger />
                    <SelectBoxSortBy
                        selected={sortBy}
                        handleSelect={handleSelectSortBy}
                        sortDirection={sortByDirection}
                        handleDirection={handleSelectSortByDirection}
                    />
                </div>
            </div>
            <div className="movies-container row">
                {movies && movies.length === 0 && loading && <Loading />}
                {movies && movies.length === 0 && !loading && <p>No results</p>}
                {movies.length > 0 &&
                    movies.map((movie) => (
                        <div key={movie.id} className="col-6 col-md-4 col-lg-3">
                            <MovieCard movie={movie} />
                        </div>
                    ))}
            </div>
            <Pagination totalPages={totalPages} currentNumPage={Number(page)} />
            <Filter />
        </div>
    );
};

export default Home;
