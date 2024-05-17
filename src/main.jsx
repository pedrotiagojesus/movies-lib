import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// CSS
import "./assets/bootstrap-5.3.3/css/bootstrap.min.css";
import "./index.css";

// pages
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Movie from "./pages/Movie.jsx";
import Search from "./pages/Search.jsx";

// Partilhar o idioma de origem, pais de origem, genero, data de lançamento

const router = createBrowserRouter([
    {
        path: "/movies-lib/",
        element: <App />,
        children: [
            {
                path: "/movies-lib/",
                element: <Home />,
            },
            {
                path: "/movies-lib/movie/:id",
                element: <Movie />,
            },
            {
                path: "/movies-lib/search",
                element: <Search />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
