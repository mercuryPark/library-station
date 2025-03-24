const express = require("express");
const cors = require("cors");
const supabase = require("./supabase/client");

const app = express();

const corsOptions = {
    origin: [
        "https://library-station.vercel.app",
        // 개발 환경을 위한 로컬호스트 허용
        "http://localhost:5173",
        "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// 라우트 설정
app.use("/links", require("./routes/links"));
app.use("/projects", require("./routes/projects"));
app.use("/test", require("./routes/test"));

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
