import { Link, useNavigate } from "react-router-dom";
import { BiCameraMovie, BiSearchAlt2 } from "react-icons/bi";
import { ChangeEvent, FormEvent, useState } from "react";

import "./Navbar.css";

const Navbar = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (search.trim()) {
            navigate(`/search?q=${encodeURIComponent(search)}`);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <nav id="navbar" className="navbar fixed-top">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <BiCameraMovie /> MoviesLib
                </Link>
                <form role="search" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Search a movie" onChange={handleChange} value={search} />
                    <button className="btn btn-primary" type="submit">
                        <BiSearchAlt2 />
                    </button>
                </form>
            </div>
        </nav>
    );
};

export default Navbar;
