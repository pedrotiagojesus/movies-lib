import { useState, useEffect } from "react";
import { useHref, useSearchParams } from "react-router-dom";

import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";

import "./MoviesGrid.css";
import Pagination from "../components/Pagination";

const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    const [searchParams] = useSearchParams();
    const page = searchParams.get("page");

    const urlRoute = "/movies-lib";
    const baseApiMovieUrl = `${moviesUrl}top_rated?${apiKey}`;

    const getMovies = async (apiUrl) => {
        setLoading(true);

        await fetch(apiUrl)
            .then((response) => response.json())
            .then((response) => {
                setLoading(false);
                if (response.results) {
                    setMovies(response.results);
                    setTotalPages(response.total_pages);
                }
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        let queryStringPage = "";

        if (page) {
            queryStringPage = `&page=${page}`;
        }

        const apiUrl = `${baseApiMovieUrl}${queryStringPage}`;
        getMovies(apiUrl);
    }, [page]);

    return (
        <div id="homepage" className="container">
            <h2 className="title">Best movies</h2>
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
        </div>
    );
};

export default Home;
