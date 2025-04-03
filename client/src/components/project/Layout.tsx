import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectContentsLayout from "./contents/Layout";
import ProjectListLayout from "./list/Layout";
import useProject from "@/hooks/useProject";
import CreateProjectDialog from "./dialog/Create";
import EditProjectDialog from "./dialog/Edit";
import AddLinkDialog from "./dialog/Add";
const ProjectLayout = () => {
    const { id } = useParams<{ id: string }>();
    const {
        projects,
        getProjects,
        setLinksByProject,
        openDialog,
        openEditDialog,
        createDialog,
        editDialog,
        addLinkDialog,
        openAddLinkDialog,
        closeDialog,
        createProject,
        deleteProject,
        addLinksToProject,
        getLinksByProject,
        linksByProject,
        updateProject,
        deleteLinkFromProject,
    } = useProject();

    const [activeProjectID, setActiveProjectID] = useState<string | null>(null);

    useEffect(() => {
        if (!projects || projects?.length === 0) {
            getProjects();
        }
    }, []);

    useEffect(() => {
        if (id) {
            getLinksByProject(id);
            setActiveProjectID(id);
        } else {
            setActiveProjectID(null);
            setLinksByProject([]);
        }
    }, [id]);

    return (
        <div className='grid grid-cols-6 gap-4 h-full'>
            <ProjectListLayout
                activeProjectID={activeProjectID}
                projects={projects}
                openDialog={openDialog}
                deleteProject={deleteProject}
                openEditDialog={openEditDialog}
            />
            <ProjectContentsLayout
                activeProjectID={activeProjectID}
                linksByProject={linksByProject}
                openAddLinkDialog={openAddLinkDialog}
                deleteLinkFromProject={deleteLinkFromProject}
            />

            <EditProjectDialog
                dialog={editDialog}
                updateProject={updateProject}
                closeDialog={() => closeDialog("edit")}
            />
            <AddLinkDialog
                dialog={addLinkDialog}
                closeDialog={() => closeDialog("addLink")}
                addLinksToProject={addLinksToProject}
                linksByProject={linksByProject}
                activeProjectID={activeProjectID}
            />
            {/* dialog */}
            <CreateProjectDialog
                dialog={createDialog}
                closeDialog={() => closeDialog("project")}
                createProject={createProject}
                addLinksToProject={addLinksToProject}
            />
        </div>
    );
};

export default ProjectLayout;
