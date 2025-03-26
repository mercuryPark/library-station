// * import libraries
import axios from "axios";

// * etc

const defaultOptions = {
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // CORS credentials 처리를 위해 필요
};

const axiosClient = axios.create(defaultOptions);

// 요청 인터셉터
axiosClient.interceptors.request.use(
    (config) => {
        // 토큰이 있다면 헤더에 추가
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // API 요청 시작 시 로딩 처리 등
        // showLoading();

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터
axiosClient.interceptors.response.use(
    (response) => {
        // API 요청 종료 시 로딩 처리 등
        // hideLoading();

        return response;
    },
    async (error) => {
        // hideLoading();

        const { response } = error;

        if (!response) {
            return Promise.reject(new Error("네트워크 에러가 발생했습니다."));
        }

        // 에러 상태 코드별 처리
        switch (response.status) {
            case 401: // 인증 에러
                // 토큰 만료 등의 처리
                localStorage.removeItem("token");
                // window.location.href = '/login';
                break;

            case 403: // 권한 에러
                // 접근 권한 없음 처리
                break;

            case 429: // Rate Limiting
                return Promise.reject(
                    new Error(
                        "요청 횟수가 초과되었습니다. 잠시 후 다시 시도해주세요."
                    )
                );

            case 500: // 서버 에러
                return Promise.reject(new Error("서버 에러가 발생했습니다."));
        }

        // 커스텀 에러 메시지가 있다면 사용
        const errorMessage =
            response.data?.message || "알 수 없는 에러가 발생했습니다.";

        // 토스트 메시지 표시 (선택적)
        // toast.error(errorMessage);

        return Promise.reject(new Error(errorMessage));
    }
);

export default axiosClient;
