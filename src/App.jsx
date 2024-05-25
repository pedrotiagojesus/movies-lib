import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

import "./App.css";

function App() {
    return (
        <>
            <Navbar />
            <main className="container">
                <Sidebar />
                <Outlet />
            </main>
        </>
    );
}

export default App;
