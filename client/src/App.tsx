import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Text from "./pages/Text";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/text' element={<Text />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
