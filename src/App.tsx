import { Outlet } from "react-router-dom";

// Layout
import Header from "./layout/Header";

function App() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default App;
