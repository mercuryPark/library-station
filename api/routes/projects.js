const express = require("express");
const router = express.Router();
const supabase = require("../supabase/client");
const crypto = require("crypto");

// 전체 프로젝트 조회
router.get("/", async (req, res) => {
    const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("updated_at", { ascending: false });

    error ? res.status(500).json(error) : res.json(data);
});

// 특정 프로젝트 조회
router.get("/:id", async (req, res) => {
    const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", req.params.id)
        .single();

    data ? res.json(data) : res.status(404).json(error);
});

// 새 프로젝트 생성
router.post("/", async (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ error: "Project title is required" });
    }

    try {
        const uniqueId = crypto.randomUUID();
        const newProject = {
            id: uniqueId,
            title,
            description,
            created_at: new Date(),
            updated_at: new Date(),
        };

        const { data, error } = await supabase
            .from("projects")
            .insert([newProject])
            .select();

        if (error) {
            throw error;
        }

        res.status(201).json({
            message: "Project created successfully",
            data: data[0],
        });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ error: error.message });
    }
});

// 프로젝트 업데이트
router.put("/:id", async (req, res) => {
    const { title, description } = req.body;

    const updateProject = {
        title,
        description,
        updated_at: new Date(),
    };

    const { data, error } = await supabase
        .from("projects")
        .update([updateProject])
        .eq("id", req.params.id)
        .select();

    error ? res.status(400).json(error) : res.json(data[0]);
});

// 프로젝트 삭제
router.delete("/:id", async (req, res) => {
    const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", req.params.id);

    error ? res.status(400).json(error) : res.json({ success: true });
});

// 프로젝트의 링크 목록 조회
router.get("/:id/links", async (req, res) => {
    const { data, error } = await supabase
        .from("project_links")
        .select(
            `
            *,
            links (*)
        `
        )
        .eq("project_id", req.params.id);

    error ? res.status(500).json(error) : res.json(data);
});

// 프로젝트에 링크 추가
router.post("/:id/link", async (req, res) => {
    const { linkId } = req.body;
    const projectId = req.params.id;

    if (!linkId) {
        return res.status(400).json({ error: "Link ID is required" });
    }

    try {
        const newProjectLink = {
            project_id: projectId,
            link_id: linkId,
            created_at: new Date(),
        };

        const { data, error } = await supabase
            .from("project_links")
            .insert([newProjectLink])
            .select();

        if (error) {
            throw error;
        }

        res.status(201).json({
            message: "Link added to project successfully",
            data: data[0],
        });
    } catch (error) {
        console.error("Error adding link to project:", error);
        res.status(500).json({ error: error.message });
    }
});

// 프로젝트에 여러 링크 한번에 추가
router.post("/:id/links", async (req, res) => {
    const { linkIds } = req.body;
    const projectId = req.params.id;

    if (!Array.isArray(linkIds) || linkIds.length === 0) {
        return res.status(400).json({ error: "Link IDs array is required" });
    }

    try {
        // 여러 링크를 한번에 추가하기 위한 데이터 준비
        const newProjectLinks = linkIds.map((linkId) => ({
            project_id: projectId,
            link_id: linkId,
            created_at: new Date(),
        }));

        const { data, error } = await supabase
            .from("project_links")
            .insert(newProjectLinks).select(`
                *,
                links (*)
            `);

        if (error) {
            throw error;
        }

        res.status(201).json({
            message: "Links added to project successfully",
            data: data,
        });
    } catch (error) {
        console.error("Error adding links to project:", error);
        res.status(500).json({ error: error.message });
    }
});

// 프로젝트에서 링크 제거
router.delete("/:id/links/:linkId", async (req, res) => {
    const { error } = await supabase
        .from("project_links")
        .delete()
        .eq("project_id", req.params.id)
        .eq("link_id", req.params.linkId);

    error ? res.status(400).json(error) : res.json({ success: true });
});

module.exports = router;
