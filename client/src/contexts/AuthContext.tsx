import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
    localLogin: () => void;
    getAccessToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 테스트용 더미 데이터
const DUMMY_USER = {
    id: "test-user-id",
    email: "test@example.com",
    user_metadata: {
        full_name: "Test User",
    },
    app_metadata: {},
    aud: "authenticated",
    created_at: new Date().toISOString(),
    role: "authenticated",
    updated_at: new Date().toISOString(),
} as User;

const DUMMY_TOKEN = "dummy_test_token_for_local_development_only";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 로컬 스토리지에서 로그인 상태 확인
        const localUser = localStorage.getItem("localUser");
        if (localUser) {
            setUser(JSON.parse(localUser));
            setLoading(false);
            return;
        }

        // Supabase 세션 확인
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
            if (error) throw error;
        } catch (error) {
            console.error("Google 로그인 에러:", error);
            throw error;
        }
    };

    const signOut = async () => {
        try {
            localStorage.removeItem("localUser");
            localStorage.removeItem("localToken");
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            setUser(null);
        } catch (error) {
            console.error("로그아웃 에러:", error);
            throw error;
        }
    };

    // 로컬 로그인 함수
    const localLogin = () => {
        setUser(DUMMY_USER);
        localStorage.setItem("localUser", JSON.stringify(DUMMY_USER));
        localStorage.setItem("localToken", DUMMY_TOKEN);
        setLoading(false);
    };

    // 액세스 토큰 가져오기
    const getAccessToken: any = async (): Promise<string | null> => {
        // 로컬 테스트 토큰 확인
        const localToken = localStorage.getItem("localToken");
        if (localToken) {
            return localToken;
        }

        // Supabase 세션 토큰 확인
        const {
            data: { session },
        } = await supabase.auth.getSession();
        return session?.access_token ?? null;
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                signInWithGoogle,
                signOut,
                localLogin,
                getAccessToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// useAuth는 Context로 만든 AuthProvider 에서 내려주는 값을 사용하는 훅

// Provider로 감싸지지않은 컴포넌트에서 useAuth를 사용하면 에러 발생
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
