import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// JS
import "bootstrap/dist/js/bootstrap.min.js";

// Pages
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Movie from "./pages/Movie.jsx";
import Search from "./pages/Search.jsx";

// Rotas com HashRouter
const router = createHashRouter([
  {
    path: "/",           // raiz do HashRouter
    element: <App />,    // componente base (navbar, layout, etc)
    children: [
      { path: "/", element: <Home /> },       // página inicial
      { path: "movie/:id", element: <Movie /> }, // detalhe de filme
      { path: "search", element: <Search /> },   // página de pesquisa
    ],
  },
]);

// Renderiza app
ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
