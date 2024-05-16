import { useState, useEffect } from "react";

import MovieCard from "../components/MovieCard";

import "./MoviesGrid.css";

const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

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
        const apiUrl = `${moviesUrl}top_rated?${apiKey}`;
        getMovies(apiUrl);
    }, []);

    return (
        <div className="container">
            <h2 className="title">Best movies</h2>
            <div className="movies-container row">
                {movies && movies.length === 0 && loading && <p>Loading...</p>}
                {movies && movies.length === 0 && !loading && <p>No results</p>}
                {movies.length > 0 &&
                    movies.map((movie) => (
                        <div key={movie.id} className="col-6 col-md-4 col-lg-3">
                            <MovieCard movie={movie} />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Home;
