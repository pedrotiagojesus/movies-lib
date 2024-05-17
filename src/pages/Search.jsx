import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";

import "./MoviesGrid.css";

const searchUrl = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
    const [searchParams] = useSearchParams();

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const query = searchParams.get("q");

    const getMovies = async (apiUrl) => {
        setLoading(true);

        await fetch(apiUrl)
            .then((response) => response.json())
            .then((response) => {
                setLoading(false);
                if (response.results) {
                    setMovies(response.results);
                }
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        const apiUrl = `${searchUrl}?${apiKey}&query=${query}`;
        getMovies(apiUrl);
    }, [query]);

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
        </div>
    );
};

export default Search;
