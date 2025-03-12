import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProjectContentsLayout from "./contents/Layout";
import ProjectListLayout from "./list/Layout";
import useProject from "@/hooks/useProject";
import CreateProjectDialog from "./dialog/Create";

const ProjectLayout = () => {
    const { id } = useParams<{ id: string }>();
    const {
        projects,
        getProjects,
        openDialog,
        projectDialog,
        closeDialog,
        createProject,
        deleteProject,
        addLinksToProject,
        getLinksByProject,
        linksByProject,
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
            />
            <ProjectContentsLayout linksByProject={linksByProject} />

            {/* dialog */}
            <CreateProjectDialog
                dialog={projectDialog}
                closeDialog={closeDialog}
                createProject={createProject}
                addLinksToProject={addLinksToProject}
            />
        </div>
    );
};

export default ProjectLayout;
