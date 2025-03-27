import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        // 세션 확인
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                // 인증 성공 시 홈으로 리디렉트
                navigate("/");
            } else {
                // 세션이 없으면 로그인 페이지로
                navigate("/login");
            }
        });
    }, [navigate]);

    return <div>인증 처리 중...</div>;
}
