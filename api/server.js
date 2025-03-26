const express = require("express");
const cors = require("cors");
const supabase = require("./supabase/client");

const app = express();

const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            "https://library-station.vercel.app",
            "http://localhost:5173",
            "http://localhost:3000",
        ];

        // origin이 undefined인 경우는 같은 출처의 요청
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
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

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Vercel serverless function export
module.exports = app;
