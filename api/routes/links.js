const express = require("express");
const router = express.Router();
const supabase = require("../supabase/client");
const ogs = require("open-graph-scraper");

const fetchOgData = async (url) => {
    const options = { url };

    try {
        const { result } = await ogs(options);
        const { ogTitle, ogImage, ogDescription, favicon } = result;

        console.log("og-result :", result);

        return {
            title: ogTitle || "No title",
            image: ogImage[0]?.url || null,
            description: ogDescription || "No description",
            favicon: favicon,
        };
    } catch (error) {
        console.error("Error fetching OG data:", error);
        throw new Error("Failed to fetch OG data");
    }
};

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
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    try {
        // Open Graph 데이터 추출
        const ogData = await fetchOgData(url);

        // 삽입할 데이터 구성
        const newLink = {
            ...req.body,
            og_data: {
                title: ogData.title,
                thumbnail_url: ogData.image,
                description: ogData.description,
                favicon: ogData.favicon,
            },
            created_at: new Date(),
        };

        // 트랜잭션 시작
        const { data, error } = await supabase
            .from("links")
            .insert([newLink])
            .select();

        if (error) {
            throw error;
        }

        res.status(201).json({
            message: "Link created successfully",
            data: data[0],
        });
    } catch (error) {
        console.error("Error creating link:", error);
        res.status(500).json({ error: error.message });
    }
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
