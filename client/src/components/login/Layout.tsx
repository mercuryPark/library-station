import LoginButton from "@/components/auth/LoginButton";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const LoginLayout = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (user) {
        return <Navigate to='/' replace />;
    }

    return (
        <div className='h-screen flex w-screen bg-[radial-gradient(145.05%_100%_at_50%_0%,#1D2B41_0%,#020509_57.38%,#0F1A29_88.16%)] items-center justify-center'>
            <div className='flex flex-col items-center justify-center px-12 py-16 backdrop-blur-sm bg-white/5 rounded-3xl shadow-2xl border border-white/10'>
                <div className='flex flex-col items-center gap-6 mb-14'>
                    <div className='flex flex-col items-center gap-2 mb-2'>
                        <span className='text-6xl mb-1 animate-pulse'>🚉</span>
                        <h1 className='text-4xl font-light text-white tracking-wider'>
                            Library Station
                        </h1>
                    </div>

                    <div className='flex items-center gap-3'>
                        <div className='h-[1px] w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent'></div>
                        <div className='w-2 h-2 rounded-full bg-white/20'></div>
                        <div className='h-[1px] w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent'></div>
                    </div>

                    <div className='flex flex-col items-center gap-2'>
                        <p className='text-xl text-white/90 font-light tracking-wide'>
                            See a Library at a Glance
                        </p>
                        <p className='text-white/50 text-sm tracking-wider font-light'>
                            Your knowledge hub, organized like a train station
                        </p>
                    </div>
                </div>

                <LoginButton />

                <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent'></div>
            </div>
        </div>
    );
};

export default LoginLayout;
