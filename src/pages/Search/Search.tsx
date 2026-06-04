import { useSearchParams } from "react-router-dom";

// CSS
import "./Search.css";

// Components
import MovieCard from "@components/MovieCard/MovieCard";
import Loading from "@components/Loading";
import Pagination from "@components/Pagination";

// Hooks
import { useSearchMovies } from "@hooks/useSearchMovies";

const Search = () => {
    const [searchParams] = useSearchParams();

    const query = searchParams.get("q") ?? "";
    const page = Number(searchParams.get("page")) || 1;
    const genre = searchParams.get("genre") ?? undefined;

    const { data, isLoading, isError } = useSearchMovies({
        query,
        page,
        genre,
    });

    const movies = data?.results ?? [];
    const totalPages = data?.total_pages ?? 0;

    return (
        <div id="search-page" className="container">
            <h2 className="title">
                Results for: <span className="query-text">{query}</span>
            </h2>
            <div className="movies-container row">
                {movies && movies.length === 0 && isLoading && <Loading />}
                {movies && movies.length === 0 && !isLoading && <p>No results</p>}
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
