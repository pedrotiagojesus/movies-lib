import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import "./Header.css";

const Header = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (search.trim()) navigate(`/search?q=${encodeURIComponent(search)}`);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const clearSearch = () => setSearch("");

    return (
        <nav id="navbar" className="navbar fixed-top">
            <div className="container">

                {/* LOGO */}
                <Link to="/" className="navbar-brand">
                    <i className="bi bi-camera-reels-fill"></i>
                    MoviesLib
                </Link>

                {/* NAVIGATION LINKS */}
                <div className="nav-links d-none d-md-flex">
                    <Link to="/movies-top-rated">Top Rated</Link>
                    <Link to="/movies-people">People</Link>
                </div>

                {/* SEARCH */}
                <form role="search" onSubmit={handleSubmit} className="search-form">
                    <input
                        type="text"
                        placeholder="Search movies..."
                        onChange={handleChange}
                        value={search}
                    />

                    {search && (
                        <button type="button" className="clear-btn" onClick={clearSearch}>
                            <i className="bi bi-x-lg"></i>
                        </button>
                    )}

                    <button className="btn-search" type="submit">
                        <i className="bi bi-search"></i>
                    </button>
                </form>

                {/* MOBILE MENU BUTTON */}
                <button className="mobile-menu-btn d-md-none">
                    <i className="bi bi-list"></i>
                </button>
            </div>
        </nav>
    );
};

export default Header;
