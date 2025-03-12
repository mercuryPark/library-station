import {
    API_BOOKMARK_LINK,
    API_DELETE_LINKS,
    API_LINKS,
    API_SAVE_LINKS,
    API_UPDATE_LINKS,
} from "@/service/link";
import { creatDialogState, editDialogState } from "@/state/dialog";
import { filteredLinksState, linksState } from "@/state/links";
import { LinkDialog } from "@/types/dialog";
import { Link } from "@/types/link";
import { useAtom, useAtomValue } from "jotai";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

interface UseLinksOptions {
    setLoading?: (loading: boolean) => void;
}

const useLinks = (options: UseLinksOptions = {}) => {
    const { setLoading } = options;

    const [links, setLinks]: any = useAtom<any>(linksState);
    const filteredLinks: any = useAtomValue<any>(filteredLinksState);
    const [, setEditDialog]: any = useAtom<LinkDialog>(editDialogState);
    const [, setCreatDialog]: any = useAtom<LinkDialog>(creatDialogState);
    const navigation = useNavigate();
    // 링크 가져오기
    const getLinks = async (bookmarked?: boolean) => {
        try {
            const res: any = await API_LINKS({ bookmarked });
            setLinks(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading?.(false);
        }
    };

    // 링크 삭제
    const deleteLink = async (id: string) => {
        try {
            const res = await API_DELETE_LINKS(id);

            if (res.data) {
                setLinks((prev: any) => {
                    return _.filter(prev, (lk: any) => lk.id !== id);
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    // 링크 수정 dialog 열기
    const openEditDialog = (data: any) => {
        setEditDialog({
            visible: true,
            data: data,
        });
    };

    // 링크 수정
    const updateLink = async (id: string, data: any) => {
        const params = {
            id: data.id,
            urls: {
                official: data.official,
                package: data.package ?? null,
                github: data.github ?? null,
            },
            bookmark: data.bookmark,
            title: data.title,
            created_at: data.created_at,
        };
        try {
            const res = await API_UPDATE_LINKS(id, params);

            if (res && res.data !== undefined) {
                setLinks((prev: any) => {
                    return _.orderBy(
                        _.map(prev, (link: any) => {
                            if (link.id === res.data.id) {
                                return res.data;
                            }

                            return link;
                        }),
                        ["updated_at"],
                        ["desc"]
                    );
                });

                setEditDialog({ data: null, visible: false });
            }
        } catch (err) {
            console.log(err);
        }
    };

    // 링크 추가
    const addLink = async (data: any) => {
        const params = {
            urls: {
                official: data.official,
                package: data.package ?? null,
                github: data.github ?? null,
            },
            bookmark: data.bookmark,
            title: data.title,
        };
        try {
            const res = await API_SAVE_LINKS(params);

            if (res && res.data.data != undefined) {
                if (window.location.href !== "/") {
                    navigation("/");
                }
                setLinks((prev: any) => {
                    return [res.data.data, ...prev];
                });

                setCreatDialog({ visible: false });
            }
        } catch (err) {
            console.log(err);
        }
    };

    // 링크로 이동
    const openLink = async (link: string) => {
        if (link.length === 0 || link === undefined) {
            // 토스트 보여줌
            return;
        }

        try {
            window.open(link, "_blank", "noopener,noreferrer");
        } catch (error) {
            // 토스트 보여줌
            console.log(error);
        }
    };

    // 북마크 링크 추가
    const addBookmark = async (link: Link | null) => {
        try {
            const res: any = await API_BOOKMARK_LINK(link?.id);
            if (res) {
                setLinks((prev: any) => {
                    return _.map(prev, (link: any) => {
                        if (link?.id === res?.data.id) {
                            return {
                                ...link,
                                bookmark: res.data.bookmark,
                            };
                        }

                        return link;
                    });
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return {
        links,
        filteredLinks,
        setLinks,
        getLinks,
        deleteLink,
        updateLink,
        addLink,
        openLink,
        openEditDialog,
        addBookmark,
    };
};

export default useLinks;
