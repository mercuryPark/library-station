const express = require("express");
const router = express.Router();
const supabase = require("../supabase/client");
const ogs = require("open-graph-scraper");
const crypto = require("crypto");

const authMiddleware = require("../middleware/auth");

// 모든 라우트에 인증 미들웨어 적용
router.use(authMiddleware);

const fetchOgData = async (urls) => {
    const { official } = urls;
    const options = { url: official };

    try {
        const { result } = await ogs(options);
        const { ogTitle, ogImage, ogDescription, favicon } = result;

        return {
            title: ogTitle || "No title",
            image: ogImage[0]?.url || null,
            description: ogDescription || "No description",
            favicon: favicon,
        };
    } catch (error) {
        console.error("Error fetching OG data:", error);

        return {
            title: "No title",
            image: null,
            description: "No description",
            favicon: null,
        };
    }
};

// 전체 링크 조회 - 사용자별 필터링 추가
router.get("/", async (req, res) => {
    const { bookmarked } = req.query;
    const userId = req.user.id; // 인증된 사용자 ID

    let query = supabase
        .from("links")
        .select("*")
        .eq("user_id", userId) // 사용자별 필터링
        .order("updated_at", { ascending: false });

    // bookmarked 쿼리 파라미터가 'true'일 경우 북마크된 항목만 필터링
    if (bookmarked === "true") {
        query = query.eq("bookmark", true);
    }

    const { data, error } = await query;
    error ? res.status(500).json(error) : res.json(data);
});

// 특정 링크 조회 - 사용자 권한 확인 추가
router.get("/:id", async (req, res) => {
    const userId = req.user.id;

    const { data, error } = await supabase
        .from("links")
        .select("*")
        .eq("id", req.params.id)
        .eq("user_id", userId) // 해당 사용자의 링크만 조회
        .single();

    if (error) {
        return res
            .status(404)
            .json({ error: "Link not found or unauthorized" });
    }

    res.json(data);
});

// 새 링크 생성 - 사용자 ID 포함
router.post("/", async (req, res) => {
    const { urls } = req.body;
    const userId = req.user.id;

    if (!urls) {
        return res.status(400).json({ error: "URL is required" });
    }

    try {
        // Generate a unique ID
        const uniqueId = crypto.randomUUID();

        // Open Graph 데이터 추출
        const ogData = await fetchOgData(urls);

        // 삽입할 데이터 구성
        const newLink = {
            ...req.body,
            id: uniqueId,
            user_id: userId, // 사용자 ID 추가
            bookmark: req.body.bookmark || false,
            og_data: {
                title: ogData.title,
                thumbnail_url: ogData.image,
                description: ogData.description,
                favicon: ogData.favicon,
            },
            created_at: new Date(),
            updated_at: new Date(),
        };

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

// 링크 업데이트 - 사용자 권한 확인 추가
router.put("/:id", async (req, res) => {
    const userId = req.user.id;
    const { urls } = req.body;

    // 링크 소유권 확인
    const { data: existingLink } = await supabase
        .from("links")
        .select("user_id")
        .eq("id", req.params.id)
        .single();

    if (!existingLink || existingLink.user_id !== userId) {
        return res
            .status(403)
            .json({ error: "Unauthorized to update this link" });
    }

    // Open Graph 데이터 추출
    const ogData = await fetchOgData(urls);

    // 삽입할 데이터 구성
    const updateLink = {
        ...req.body,
        og_data: {
            title: ogData.title,
            thumbnail_url: ogData.image,
            description: ogData.description,
            favicon: ogData.favicon,
        },
        updated_at: new Date(),
    };

    const { data, error } = await supabase
        .from("links")
        .update([updateLink])
        .eq("id", req.params.id)
        .eq("user_id", userId) // 사용자 확인
        .select();

    error ? res.status(400).json(error) : res.json(data[0]);
});

// 링크 삭제 - 사용자 권한 확인 추가
router.delete("/:id", async (req, res) => {
    const userId = req.user.id;

    // 링크 소유권 확인
    const { data: existingLink } = await supabase
        .from("links")
        .select("user_id")
        .eq("id", req.params.id)
        .single();

    if (!existingLink || existingLink.user_id !== userId) {
        return res
            .status(403)
            .json({ error: "Unauthorized to delete this link" });
    }

    const { error } = await supabase
        .from("links")
        .delete()
        .eq("id", req.params.id)
        .eq("user_id", userId); // 사용자 확인

    error ? res.status(400).json(error) : res.json({ success: true });
});

// 북마크 토글 - 사용자 권한 확인 추가
router.patch("/:id/bookmark", async (req, res) => {
    const userId = req.user.id;

    try {
        // 현재 링크 정보 조회 및 권한 확인
        const { data: currentLink, error: fetchError } = await supabase
            .from("links")
            .select("bookmark, user_id")
            .eq("id", req.params.id)
            .eq("user_id", userId) // 사용자 확인
            .single();

        if (fetchError || !currentLink) {
            return res
                .status(404)
                .json({ error: "Link not found or unauthorized" });
        }

        // 북마크 상태 토글
        const { data, error: updateError } = await supabase
            .from("links")
            .update({
                bookmark: !currentLink.bookmark,
                updated_at: new Date(),
            })
            .eq("id", req.params.id)
            .eq("user_id", userId) // 사용자 확인
            .select();

        if (updateError) {
            throw updateError;
        }

        res.json(data[0]);
    } catch (error) {
        console.error("Error toggling bookmark:", error);
        res.status(500).json({ error: error.message });
    }
});

// OG태그 썸네일만 가져오기
router.post("/og-thumbnail", async (req, res) => {
    if (!req.body.url) {
        return res.status(400).json({ error: "URL is required" });
    }

    try {
        // Open Graph 데이터 추출
        const ogData = await fetchOgData({
            official: req.body.url,
        });

        // 삽입할 데이터 구성
        const newLink = {
            og_data: { thumbnail_url: ogData.image },
        };

        res.status(201).json({
            message: "Link created successfully",
            data: newLink,
        });
    } catch (error) {
        console.error("Error creating link:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
