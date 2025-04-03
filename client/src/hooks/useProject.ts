import {
    API_ADD_LINK_TO_PROJECT,
    API_ADD_LINKS_TO_PROJECT,
    API_CREATE_PROJECT,
    API_DELETE_LINK_FROM_PROJECT,
    API_DELETE_PROJECT,
    API_GET_LINKS_BY_PROJECT,
    API_GET_PROJECTS,
    API_UPDATE_PROJECT,
} from "@/service/project";
import { useEffect, useState } from "react";
import useLinks from "./useLinks";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { projectLinksState } from "@/state/links";

const useProject = () => {
    const { links, getLinks } = useLinks();
    const navigate = useNavigate();
    const [projects, setProjects] = useAtom<any>(projectLinksState);
    const [createDialog, setCreateDialog] = useState({
        visible: false,
        data: null,
    });

    const [addLinkDialog, setAddLinkDialog] = useState<any>({
        visible: false,
        data: null,
    });

    const [editDialog, setEditDialog] = useState<any>({
        visible: false,
        data: null,
    });

    const [linksByProject, setLinksByProject] = useState<any[]>([]);

    const openDialog = () => {
        setCreateDialog({
            visible: true,
            data: null,
        });
    };

    const openEditDialog = (id: string, data: any) => {
        setEditDialog({
            visible: true,
            data: { ...data, id },
        });
    };

    const openAddLinkDialog = (id: string, data: any) => {
        setAddLinkDialog({
            visible: true,
            data: { ...data, id },
        });
    };
    const closeDialog = (type: string) => {
        if (type === "project") {
            setCreateDialog({
                visible: false,
                data: null,
            });
        } else if (type === "edit") {
            setEditDialog({
                visible: false,
                data: null,
            });
        } else if (type === "addLink") {
            setAddLinkDialog({
                visible: false,
                data: null,
            });
        }
    };

    const getProjects = async () => {
        const res = await API_GET_PROJECTS();
        setProjects(res);
    };

    const createProject = async (data: any) => {
        const res = await API_CREATE_PROJECT(data);

        if (res.data) {
            navigate(`/project/${res.data.id}`);
            setProjects((prev: any) => {
                return [res.data, ...prev];
            });
        }

        return res.data;
    };

    const updateProject = async (id: string, data: any) => {
        const res = await API_UPDATE_PROJECT(id, data);

        setProjects((prev: any) => {
            return prev.map((project: any) => {
                if (project.id === id) {
                    return res;
                }

                return project;
            });
        });
    };

    const deleteProject = async (id: string) => {
        const res: any = await API_DELETE_PROJECT(id);

        if (res) {
            navigate("/project");
            setProjects((prev: any) => {
                return _.filter(prev, (pj: any) => pj.id !== id);
            });
        }
    };

    const addLinkToProject = async (
        id: string,
        linkId: string,
        active: boolean
    ) => {
        const res = await API_ADD_LINK_TO_PROJECT(id, linkId);

        if (active) {
            setLinksByProject((prev) => [...prev, res.data]);
        }
    };

    const addLinksToProject = async (id: string, linkIds: string[]) => {
        const res = await API_ADD_LINKS_TO_PROJECT(id, linkIds);

        if (res.data) {
            setLinksByProject((prev) => [...prev, ...res.data]);
        }

        return res.data;
    };

    const deleteLinkFromProject = async (id: string, linkId: string) => {
        const res = await API_DELETE_LINK_FROM_PROJECT(id, linkId);

        if (res) {
            setLinksByProject((prev) => {
                return _.filter(prev, (link) => link.links.id !== linkId);
            });
        }
    };

    const getLinksByProject = async (id: string) => {
        const res = await API_GET_LINKS_BY_PROJECT(id);
        setLinksByProject(res);
    };

    useEffect(() => {
        if (links.length === 0) {
            getLinks();
        }
    }, []);

    return {
        projects,
        linksByProject,
        setLinksByProject,
        getProjects,
        openDialog,
        openEditDialog,
        openAddLinkDialog,
        closeDialog,
        createDialog,
        editDialog,
        addLinkDialog,
        createProject,
        updateProject,
        deleteProject,
        addLinkToProject,
        addLinksToProject,
        deleteLinkFromProject,
        getLinksByProject,
    };
};

export default useProject;
