import { useSearchParams } from "react-router-dom";

// CSS
import "./MoviesTopRated.css";

// Hooks
import { useTopRated } from "@hooks/useTopRated";

// Components
import Loading from "@components/Loading/Loading";
import MovieCard from "@components/MovieCard/MovieCard";
import Pagination from "@components/Pagination";

const MoviesTopRated = () => {
    const [searchParams] = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;

    const { data, isLoading, isError } = useTopRated({ page });
    const movies = data?.results ?? [];
    const totalPages = data?.total_pages ?? 0;

    return (
        <div id="movies-top-rated-page" className="container">
            <h1 className="title">Top Rated</h1>
            <p>Top Rated</p>
            {movies && movies.length === 0 && isLoading && <Loading />}
            {movies && movies.length === 0 && !isLoading && <p>No results</p>}
            {movies.length > 0 && (
                <div className="movies-container row">
                    {movies.map((movie) => (
                        <div key={movie.id} className="col-6 col-md-4 col-lg-3">
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>
            )}
            <Pagination totalPages={totalPages} currentNumPage={Number(page)} />
        </div>
    );
};

export default MoviesTopRated;
