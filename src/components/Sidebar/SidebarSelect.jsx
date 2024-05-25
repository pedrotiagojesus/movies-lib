import React from "react";
import { Link } from "react-router-dom";

const SidebarSelect = ({ title, arr, selected, route }) => {
    if (arr.length === 0) {
        return;
    }

    return (
        <>
            <h4 className="title">{title}</h4>
            <ul className="nav flex-column">
                {arr.map((row) => (
                    <li key={row.id} className="nav-item">
                        <Link
                            className={`nav-link ${
                                selected == row.id ? "active" : ""
                            }`}
                            to={`${route}${row.id}`}
                        >
                            {row.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default SidebarSelect;
