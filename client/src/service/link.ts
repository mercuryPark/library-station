import axios from "@/utils/axios";

export const API_LINKS = async () => {
    const res = await axios.get("/links");

    return res;
};

export const API_SAVE_LINKS = () => {};

export const API_UPDATE_LINKS = () => {};

export const API_DELETE_LINKS = () => {};
