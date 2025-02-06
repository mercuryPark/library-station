// * import libraries
import axios from "axios";

// * etc

const defaultOptions = {
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
        // "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        // "Accept-Encoding": "identity",
        "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Headers":
        //     "authorization, x-client-info, apikey, content-type, prefer, content-profile",
        // "Access-Control-Allow-Methods": "GET",
        // Accept: 'application/json',
    },
    // withCredentials: true,
};

const axiosClient = axios.create(defaultOptions);

// 요청
axiosClient.interceptors.request.use((config) => {
    // HttpOnly 쿠키에서 토큰을 가져옴

    // HTTP 요청에 Authorization 헤더에 토큰을 포함시킴
    // config.headers.Authorization = `Bearer sbp_4bb1af33d1bafefa988e7d389f31c68a3716b87b`;
    // } else {
    //   window.location.href = '/login'
    return config;
});

// 응답
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const result = error.response;

        let errMessage = "";

        if (
            result === undefined ||
            result.status === 500 ||
            result.data === undefined
        ) {
            errMessage = "서버와의 통신에 실패하였습니다.";
        } else {
            const config = result.config;

            errMessage = result.data.message;

            console.log(errMessage, config);
            /**
             * 410 응답
             * 419 응답 && refresh-token API
             */

            // if (result.status === 429) {
            //   errMessage = `요청횟수가 초과되었습니다/ 나중에 시도해주세요.`
            // }
            // if (errMessage === undefined) {
            //   errMessage = `에러가 발생했습니다. 관리자에게 문의해주세요.`
            // } else if (errMessage.length === 0) {
            //   errMessage = `에러가 발생했습니다. 관리자에게 문의해주세요.`
            // }
        }
        // toast.error(errMessage, {
        //   position: toast.POSITION.TOP_LEFT,
        // })
        return Promise.reject(error);
    }
);

export default axiosClient;
