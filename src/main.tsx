import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// JS
import "bootstrap/dist/js/bootstrap.min.js";

// pages
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Movie from "./pages/Movie.jsx";
import Search from "./pages/Search.jsx";

const router = createHashRouter([
    {
        path: "/", // raiz do HashRouter
        element: <App />,
        children: [
            { path: "/", element: <Home /> },
            { path: "movie/:id", element: <Movie /> },
            { path: "search", element: <Search /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
