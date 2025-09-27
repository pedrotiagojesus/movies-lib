import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <BrowserRouter basename="/movies-lib/">
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="movie/:id" element={<Movie />} />
          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
