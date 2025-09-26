import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCurrentURL } from "../../hooks/useCurrentUrl";

// CSS
import "./Filter.css";

// Icons
import { LiaTimesSolid } from "react-icons/lia";

// Env
const baseApi = import.meta.env.VITE_BASE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Filter = () => {
    const [genres, setGenres] = useState<MovieGenre[]>([]);

    const { pathname, searchParams } = useCurrentURL();

    const genreId = Number(searchParams.get("genre"));

    const apiGenreUrl = `${baseApi}genre/movie/list?${apiKey}`;

    const getGenres = async (apiUrl: string) => {
        const res = await fetch(apiUrl);
        const data: MovieGenresResponse = await res.json();
        setGenres(data.genres);
    };

    useEffect(() => {
        getGenres(apiGenreUrl);
    }, [apiGenreUrl]);

    const buildUrl = (rowGenreId: number) => {
        let url = pathname;

        switch (pathname) {
            case "/movies-lib":
                break;
            case "/movies-lib/search":
                const search = searchParams.get("q");
                url = `${url}?q=${search}`;
                break;

            default:
                break;
        }

        if (genreId != rowGenreId) {
            if (url.includes("?")) {
                url = `${url}&genre=${rowGenreId}`;
            } else {
                url = `${url}?genre=${rowGenreId}`;
            }
        }

        return url;
    };

    return (
        <div className="modal fade" id="filter-modal" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-3">Filters</h1>
                        <button type="button" className="btn" data-bs-dismiss="modal" aria-label="Close">
                            <LiaTimesSolid />
                        </button>
                    </div>
                    <div className="modal-body">
                        <h4 className="title fs-4">Genre</h4>
                        <div className="filter-items">
                            {genres.map((row) => (
                                <Link
                                    key={row.id}
                                    className={`nav-link btn btn-primary ${genreId == row.id ? "active" : ""}`}
                                    to={buildUrl(row.id)}
                                >
                                    {row.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;
