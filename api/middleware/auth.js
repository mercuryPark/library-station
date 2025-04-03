const supabase = require("../supabase/client");

// 테스트용 더미 유저 데이터
const TEST_USER = {
    id: "1d519be6-ff7f-4718-a2e3-141831a6d6eb", // 실제 존재하는 사용자 ID
    email: "test@test.com",
    user_metadata: {
        full_name: "Test User",
    },
};

const authMiddleware = async (req, res, next) => {
    try {
        // 개발 환경에서는 토큰 검증 건너뛰기
        if (process.env.NODE_ENV === "development") {
            // 실제 존재하는 사용자 확인
            const { data: users, error } = await supabase
                .from("users")
                .select("id")
                .limit(1)
                .single();

            if (users) {
                TEST_USER.id = users.id; // 실제 사용자 ID로 업데이트
            }

            req.user = TEST_USER;
            return next();
        }

        // 프로덕션 환경에서는 정상적으로 토큰 검증
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "인증이 필요합니다.",
            });
        }

        const {
            data: { user },
            error,
        } = await supabase.auth.getUser(token);

        if (error || !user) {
            return res.status(401).json({
                message: "유효하지 않은 토큰입니다.",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Auth error:", error);
        res.status(500).json({
            message: "인증 처리 중 오류가 발생했습니다.",
        });
    }
};

module.exports = authMiddleware;
