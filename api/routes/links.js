const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");

// 전체 링크 조회
router.get("/", async (req, res) => {
    const { data, error } = await supabase
        .from("links")
        .select("*")
        .order("created_at", { ascending: false });

    error ? res.status(500).json(error) : res.json(data);
});

// 특정 링크 조회
router.get("/:id", async (req, res) => {
    const { data, error } = await supabase
        .from("links")
        .select("*")
        .eq("id", req.params.id)
        .single();

    data ? res.json(data) : res.status(404).json(error);
});

// 새 링크 생성
router.post("/", async (req, res) => {
    const { data, error } = await supabase
        .from("links")
        .insert([req.body])
        .select();

    error ? res.status(400).json(error) : res.status(201).json(data[0]);
});

// 링크 업데이트
router.put("/:id", async (req, res) => {
    const { data, error } = await supabase
        .from("links")
        .update(req.body)
        .eq("id", req.params.id)
        .select();

    error ? res.status(400).json(error) : res.json(data[0]);
});

// 링크 삭제
router.delete("/:id", async (req, res) => {
    const { error } = await supabase
        .from("links")
        .delete()
        .eq("id", req.params.id);

    error ? res.status(400).json(error) : res.json({ success: true });
});

module.exports = router;
