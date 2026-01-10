import { useState } from "react";
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
import { useDiscoverMovies } from "@hooks/useDiscoverMovies";

const Home = () => {
    const [sortBy, setSortBy] = useState<SortOption>("popularity");
    const [sortByDirection, setSortByDirection] = useState<SortDirection>("desc");

    const [searchParams] = useSearchParams();

    const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
    const genre = searchParams.get("genre") || undefined;

    const { data, isLoading, isError } = useDiscoverMovies({
        page,
        genre,
        sortBy,
        sortDirection: sortByDirection,
    });

    const movies = data?.results ?? [];
    const totalPages = data?.total_pages ?? 0;

    const handleSelectSortBy = (value: SortOption) => setSortBy(value);
    const handleSelectSortByDirection = (value: SortDirection) => setSortByDirection(value);

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
                {movies && movies.length === 0 && isLoading && <Loading />}
                {movies && movies.length === 0 && !isLoading && <p>No results</p>}
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
