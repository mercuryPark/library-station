const express = require("express");
const cors = require("cors");
const supabase = require("./supabase/client");

const app = express();
app.use(cors());
app.use(express.json());

// 라우트 설정
app.use("/links", require("./routes/links"));

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
