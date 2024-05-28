import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import "./Filter.css";
import { LiaTimesSolid } from "react-icons/lia";

const baseApi = import.meta.env.VITE_BASE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Filter = () => {
    const [genders, setGenders] = useState([]);

    const [searchParams] = useSearchParams();

    const genderId = searchParams.get("gender");

    const apiGenderUrl = `${baseApi}genre/movie/list?${apiKey}`;

    const getGenders = async (apiUrl) => {
        await fetch(apiUrl)
            .then((response) => response.json())
            .then((response) => {
                if (response.genres) {
                    setGenders(response.genres);
                }
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        getGenders(apiGenderUrl);
    }, []);

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
                        <h4 className="title fs-4">Gender</h4>
                        <div className="filter-items">
                            {genders.map((row) => (
                                <Link
                                    key={row.id}
                                    className={`nav-link btn btn-primary ${
                                        genderId == row.id ? "active" : ""
                                    }`}
                                    to={`/movies-lib${
                                        genderId == row.id
                                            ? ""
                                            : `?gender=${row.id}`
                                    }`}
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
