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
const useProject = () => {
    const { links, getLinks } = useLinks();
    const [projects, setProjects] = useState<any[]>([]);
    const [createDialog, setCreateDialog] = useState({
        visible: false,
        data: null,
    });

    const [editDialog, setEditDialog] = useState({
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
        }
    };

    const getProjects = async () => {
        const res = await API_GET_PROJECTS();
        setProjects(res);
    };

    const createProject = async (data: any) => {
        const res = await API_CREATE_PROJECT(data);

        if (res.data) {
            setProjects((prev) => {
                return [res.data, ...prev];
            });
        }

        return res.data;
    };

    const updateProject = async (id: string, data: any) => {
        const res = await API_UPDATE_PROJECT(id, data);

        setProjects((prev) => {
            return prev.map((project) => {
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
            setProjects((prev) => {
                return _.filter(prev, (project) => project.id !== id);
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
        return await API_ADD_LINKS_TO_PROJECT(id, linkIds);
    };

    const deleteLinkFromProject = async (id: string, linkId: string) => {
        const res = await API_DELETE_LINK_FROM_PROJECT(id, linkId);

        if (res.data) {
            setProjects((prev) => {
                return _.filter(prev, (project) => project.id !== id);
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
        getProjects,
        openDialog,
        openEditDialog,
        closeDialog,
        createDialog,
        editDialog,
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
