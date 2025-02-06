const express = require("express");
const router = express.Router();

// 테스트
router.get("/test", async (req, res) => {
    res.json(req);
});

module.exports = router;
