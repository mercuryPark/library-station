import "./styles/App.css";
import "./styles/radix.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./components/home/Layout";
import BookmarkLayout from "./components/bookmark/Layout";
import ProjectLayout from "./components/project/Layout";
import LoginLayout from "./components/login/Layout";
import Layout from "./Layout";

function App() {
    return (
        <>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path='/' element={<HomeLayout />} />
                        <Route path='/login' element={<LoginLayout />} />
                        <Route path='/bookmark' element={<BookmarkLayout />} />
                        <Route path='/project' element={<ProjectLayout />} />
                        <Route
                            path='/project/:id'
                            element={<ProjectLayout />}
                        />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </>
    );
}

export default App;
