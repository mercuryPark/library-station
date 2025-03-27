import "./styles/App.css";
import "./styles/radix.css";

import { AuthProvider } from "@/contexts/AuthContext";
import Router from "@/Router";

function App() {
    return (
        <AuthProvider>
            <Router />
        </AuthProvider>
    );
}

export default App;
