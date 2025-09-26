import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// CSS
import "./MoviesGrid.css";

// Components
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";

// Hooks
import { useMovies } from "../hooks/useMovies";

// Env
const viteBaseApi = import.meta.env.VITE_BASE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const page = searchParams.get("page");
    const gender = searchParams.get("gender");

    const { movies, totalPages, loading, error, getMovies } = useMovies();

    useEffect(() => {
        const params = new URLSearchParams();
        params.append("query", query || "");

        if (page) params.append("page", page);
        const apiUrl = `${viteBaseApi}search/movie?${apiKey}&${params.toString()}`;
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
            <Pagination totalPages={totalPages} currentNumPage={Number(page)} />
        </div>
    );
};

export default Search;
