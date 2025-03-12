import axios from "@/utils/axios";

export const API_GET_PROJECTS = async () => {
    const res = await axios.get("/projects");
    return res.data;
};

export const API_GET_PROJECT = async (id: string) => {
    const res = await axios.get(`/projects/${id}`);
    return res.data;
};

export const API_CREATE_PROJECT = async (data: any) => {
    const res = await axios.post("/projects", data);
    return res.data;
};

export const API_UPDATE_PROJECT = async (id: string, data: any) => {
    const res = await axios.put(`/projects/${id}`, data);
    return res.data;
};

export const API_DELETE_PROJECT = async (id: string) => {
    const res = await axios.delete(`/projects/${id}`);
    return res.data;
};

export const API_ADD_LINK_TO_PROJECT = async (id: string, linkId: string) => {
    const res = await axios.post(`/projects/${id}/links/${linkId}`);
    return res.data;
};

export const API_ADD_LINKS_TO_PROJECT = async (
    id: string,
    linkIds: string[]
) => {
    const res = await axios.post(`/projects/${id}/links`, { linkIds });
    return res.data;
};

export const API_DELETE_LINK_FROM_PROJECT = async (
    id: string,
    linkId: string
) => {
    const res = await axios.delete(`/projects/${id}/links/${linkId}`);
    return res.data;
};

export const API_GET_LINKS_BY_PROJECT = async (id: string) => {
    const res = await axios.get(`/projects/${id}/links`);
    return res.data;
};
