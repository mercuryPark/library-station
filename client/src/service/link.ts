import axios from "@/utils/axios";

interface GetLinksParams {
    bookmarked?: boolean;
}

export const API_LINKS = async (params?: GetLinksParams) => {
    return await axios.get("/links", { params });
};

export const API_SAVE_LINKS = async (params: any) => {
    return await axios.post("/links", params);
};

export const API_UPDATE_LINKS = async (id: string, params: any) => {
    return await axios.put(`/links/${id}`, params);
};

export const API_DELETE_LINKS = async (id: string) => {
    return await axios.delete(`/links/${id}`);
};

export const API_GET_THUMBNAIL_IMAGE = async (params: any) => {
    return await axios.post("/links/og-thumbnail", params);
};

export const API_BOOKMARK_LINK = async (id: number | undefined) => {
    return await axios.patch(`/links/${id}/bookmark`);
};
