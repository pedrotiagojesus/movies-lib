import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCurrentURL } from "../../hooks/useCurrentUrl";

import "./Filter.css";
import { LiaTimesSolid } from "react-icons/lia";

const baseApi = import.meta.env.VITE_BASE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Filter = () => {
    const [genres, setGenres] = useState([]);

    const { pathname, search, searchParams } = useCurrentURL();

    const genreId = searchParams.get("genre");

    const apiGenreUrl = `${baseApi}genre/movie/list?${apiKey}`;

    const getGenres = async (apiUrl) => {
        await fetch(apiUrl)
            .then((response) => response.json())
            .then((response) => {
                if (response.genres) {
                    setGenres(response.genres);
                }
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        getGenres(apiGenreUrl);
    }, []);

    const buildUrl = (rowGenreId) => {
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
        <div className="modal fade" id="filter-modal" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-3">Filters</h1>
                        <button
                            type="button"
                            className="btn"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        >
                            <LiaTimesSolid />
                        </button>
                    </div>
                    <div className="modal-body">
                        <h4 className="title fs-4">Genre</h4>
                        <div className="filter-items">
                            {genres.map((row) => (
                                <Link
                                    key={row.id}
                                    className={`nav-link btn btn-primary ${
                                        genreId == row.id ? "active" : ""
                                    }`}
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
