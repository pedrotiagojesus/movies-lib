import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";

import "./MoviesGrid.css";
import Pagination from "../components/Pagination";
import SelectBoxSortBy from "../components/SelectBoxSortBy";
import FilterTrigger from "../components/Modal/FilterTrigger";
import Filter from "../components/Modal/Filter";

const viteBaseApi = import.meta.env.VITE_BASE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [sortBy, setSortBy] = useState("popularity");
    const [sortByDirection, setSortByDirection] = useState("desc");
    const [loading, setLoading] = useState(false);

    const [searchParams] = useSearchParams();
    const page = searchParams.get("page");
    const genre = searchParams.get("genre");

    const urlRoute = `/movies-lib`;

    const getMovies = async (apiUrl) => {
        setLoading(true);

        await fetch(apiUrl)
            .then((response) => response.json())
            .then((response) => {
                setLoading(false);
                if (response.results) {
                    setMovies(response.results);
                    setTotalPages(response.total_pages);
                } else {
                    setMovies([]);
                    setTotalPages(0);
                }
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        let queryStringPage = "";

        if (page) {
            queryStringPage = `${queryStringPage}&page=${page}`;
        }

        if (genre) {
            queryStringPage = `${queryStringPage}&with_genres=${genre}`;
        }

        queryStringPage = `${queryStringPage}&sort_by=${sortBy}.${sortByDirection}`;

        const apiUrl = `${viteBaseApi}discover/movie?${apiKey}${queryStringPage}`;
        getMovies(apiUrl);
    }, [page, genre, sortBy, sortByDirection]);

    const handleSelectSortBy = (value) => {
        setSortBy(value);
    };

    const handleSelectSortByDirection = (value) => {
        setSortByDirection(value);
    };

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
            <Pagination
                urlRoute={urlRoute}
                totalPages={totalPages}
                currentNumPage={page}
            />
            <Filter />
        </div>
    );
};

export default Home;
