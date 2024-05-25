import { useEffect, useState } from "react";
import "./Sidebar.css";
import { Link, useSearchParams } from "react-router-dom";
import SidebarSelect from "./SidebarSelect";

const baseApi = import.meta.env.VITE_BASE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Sidebar = () => {
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
        <aside>
            <SidebarSelect
                title="Gender"
                arr={genders}
                selected={genderId}
                route="/movies-lib?gender="
            />
        </aside>
    );
};

export default Sidebar;
