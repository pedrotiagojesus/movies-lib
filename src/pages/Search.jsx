import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";

import "./MoviesGrid.css";
import Pagination from "../components/Pagination";

const viteBaseApi = import.meta.env.VITE_BASE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const page = searchParams.get("page");
    const gender = searchParams.get("gender");

    const [loading, setLoading] = useState(false);

    const urlRoute = `/movies-lib/search?q=${query}`;

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

        queryStringPage = `&query=${query}`;

        if (page) {
            queryStringPage = `${queryStringPage}&page=${page}`;
        }

        const apiUrl = `${viteBaseApi}search/movie?${apiKey}${queryStringPage}`;
        getMovies(apiUrl);

        console.log(apiUrl);
    }, [query, page, gender]);

    return (
        <div id="search-page" className="container">
            <h2 className="title">
                Results for: <span className="query-text">{query}</span>
            </h2>
            <div className="movies-container row">
                {movies && movies.length === 0 && loading && <Loading />}
                {movies && movies.length === 0 && !loading && <p>No results</p>}
                {movies &&
                    movies.length > 0 &&
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
        </div>
    );
};

export default Search;
