import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// CSS
import "./assets/bootstrap-5.3.3/css/bootstrap.min.css";
import "./index.css";

// pages
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Movie from "./pages/Movie.jsx";
import Search from "./pages/Search.jsx";

// Partilhar o idioma de origem, pais de origem, genero, data de lançamento
// É possível recolher os atores?
// Informação em PT

ReactDOM.createRoot(document.getElementById("root")).render(
    <App>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/movie/:id" element={<Movie />}></Route>
                <Route path="/search" element={<Search />}></Route>
            </Routes>
        </BrowserRouter>
    </App>
);
