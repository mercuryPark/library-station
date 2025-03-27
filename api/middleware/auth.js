const supabase = require("../supabase/client");

const authMiddleware = async (req, res, next) => {
    try {
        // Authorization 헤더에서 토큰 추출
        const token = req.headers.authorization?.split(" ")[1];

        console.log(token);

        if (!token) {
            return res.status(401).json({
                message: "인증이 필요합니다.",
            });
        }

        // Supabase 토큰 검증
        const {
            data: { user },
            error,
        } = await supabase.auth.getUser(token);

        console.log(user);

        if (error || !user) {
            return res.status(401).json({
                message: "유효하지 않은 토큰입니다.",
            });
        }

        // 사용자 정보를 요청 객체에 추가
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
