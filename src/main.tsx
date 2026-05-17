import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.min.css";

// Slidejs
import '@splidejs/react-splide/css';

// CSS
import "./assets/styles/base.css";
import "./assets/styles/globals.css";

// Pages
import App from "./App.jsx";
import Homepage from "./pages/Homepage/Homepage.js";
import Movie from "./pages/Movie/Movie.js";
import Search from "./pages/Search/Search.jsx";
import Person from "@pages/Person/Person";
import MoviesUpcoming from "@pages/MoviesUpcoming/MoviesUpcoming";

const rootElement = document.getElementById("root");
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter basename="/movies-lib/">
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<Homepage />} />
                        <Route path="movie/:id" element={<Movie />} />
                        <Route path="search" element={<Search />} />
                        <Route path="person/:id" element={<Person />} />
                        <Route path="movies-upcoming" element={<MoviesUpcoming />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>,
    );
}
