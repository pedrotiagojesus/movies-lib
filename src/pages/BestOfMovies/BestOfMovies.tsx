// import { useParams } from "react-router-dom";

// CSS
import "./BestOfMovies.css";

// Hooks
// import { useCollection } from "@hooks/useCollection";

// // Components
// import Loading from "@components/Loading/Loading";
// import MovieCard from "@components/MovieCard/MovieCard";

const BestOfMovies = () => {

    // const { id } = useParams();

    // const { data, isLoading, isError } = useCollection(id!);

    return (
        <div id="movies-collection-page" className="container">
            <h1 className="title">Best Of</h1>
            {/* {data && isLoading && <Loading />}
            <p>{data?.name}</p>
            {data?.parts && data?.parts?.length > 0 && (
                <div className="movies-container row">
                    {data?.parts.map((movie) => (
                        <div key={movie.id} className="col-6 col-md-4 col-lg-3">
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>
            )} */}
        </div>
    );
};

export default BestOfMovies;
