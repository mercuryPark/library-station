import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths(), tailwindcss()],

    // cors
    // server: {
    //     // Proxy 설정
    //     proxy: {
    //         // 경로가 "/api" 로 시작하는 요청을 대상으로 proxy 설정
    //         "/api": {
    //             // 요청 전달 대상 서버 주소 설정
    //             target: "http://www.aladin.co.kr",
    //             // 요청 헤더 host 필드 값을 대상 서버의 호스트 이름으로  변경
    //             changeOrigin: true,
    //             // 요청 경로에서 '/api' 제거
    //             rewrite: (path) => path.replace(/^\/api/, ""),
    //             // SSL 인증서 검증 무시
    //             secure: false,
    //             // WebSocket 프로토콜 사용
    //             ws: true,
    //         },
    //     },
    // },
});
