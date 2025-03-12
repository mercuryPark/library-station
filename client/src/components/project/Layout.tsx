import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProjectContentsLayout from "./contents/Layout";
import ProjectListLayout from "./list/Layout";
import useProject from "@/hooks/useProject";
import CreateProjectDialog from "./dialog/Create";
import EditProjectDialog from "./dialog/Edit";
const ProjectLayout = () => {
    const { id } = useParams<{ id: string }>();
    const {
        projects,
        getProjects,
        openDialog,
        openEditDialog,
        createDialog,
        editDialog,
        closeDialog,
        createProject,
        deleteProject,
        addLinksToProject,
        getLinksByProject,
        linksByProject,
        updateProject,
    } = useProject();

    useEffect(() => {
        getProjects();
    }, []);

    useEffect(() => {
        if (id) {
            getLinksByProject(id);
        }
    }, [id]);

    return (
        <div className='grid grid-cols-6 gap-4 h-full'>
            <ProjectListLayout
                projects={projects}
                openDialog={openDialog}
                deleteProject={deleteProject}
                openEditDialog={openEditDialog}
            />
            <ProjectContentsLayout linksByProject={linksByProject} />

            <EditProjectDialog
                dialog={editDialog}
                updateProject={updateProject}
                closeDialog={() => closeDialog("edit")}
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
