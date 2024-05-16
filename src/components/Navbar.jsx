import { Link, useNavigate } from "react-router-dom";
import { BiCameraMovie, BiSearchAlt2 } from "react-icons/bi";

import "./Navbar.css";
import { useState } from "react";

const Navbar = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (search) {
            navigate(`/search?q=${search}`);
        }
    };

    return (
        <nav id="navbar" className="navbar fixed-top">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <BiCameraMovie /> MoviesLib
                </Link>
                <form role="search" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Search a movie"
                        onInput={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                    <button className="btn btn-primary" type="submit">
                        <BiSearchAlt2 />
                    </button>
                </form>
            </div>
        </nav>
    );
};

export default Navbar;
