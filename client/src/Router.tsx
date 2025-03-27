import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "./Layout";
import HomeLayout from "./components/home/Layout";
import BookmarkLayout from "./components/bookmark/Layout";
import ProjectLayout from "./components/project/Layout";
import LoginLayout from "./components/login/Layout";
import AuthCallback from "./pages/auth/AuthCallback";

function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        console.log("user is not logged in");
        return <Navigate to='/login' />;
    }

    return <>{children}</>;
}

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 인증이 필요없는 라우트 */}
                <Route path='/login' element={<LoginLayout />} />
                <Route path='/auth/callback' element={<AuthCallback />} />

                {/* Layout이 적용된 인증이 필요한 라우트 */}
                <Route path='/*' element={<Layout />}>
                    <Route
                        path=''
                        element={
                            <PrivateRoute>
                                <HomeLayout />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path='bookmark'
                        element={
                            <PrivateRoute>
                                <BookmarkLayout />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path='project'
                        element={
                            <PrivateRoute>
                                <ProjectLayout />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path='project/:id'
                        element={
                            <PrivateRoute>
                                <ProjectLayout />
                            </PrivateRoute>
                        }
                    />
                    <Route path='*' element={<Navigate to='/' replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
