import ListItem from "./ListItem";
import _ from "lodash";
import { PlusIcon } from "@heroicons/react/24/outline";

const ProjectListLayout = ({
    activeProjectID,
    projects,
    openDialog,
    deleteProject,
    openEditDialog,
}: {
    activeProjectID: string | null;
    projects: any;
    openDialog: () => void;
    deleteProject: (id: string) => void;
    openEditDialog: (id: string, data: any) => void;
}) => {
    return (
        <div className='col-span-1 relative  h-full border-r-1 border-gray-700'>
            <div className='p-4 border-b-1 border-gray-600 text-gray-200 text-sm font-bold'>
                <h1>프로젝트 목록</h1>
            </div>
            <ul className='flex flex-col  overflow-y-auto'>
                {_.map(projects, (project) => {
                    return (
                        <ListItem
                            key={project.id}
                            activeProjectID={activeProjectID}
                            project={project}
                            deleteProject={deleteProject}
                            openEditDialog={openEditDialog}
                        />
                    );
                })}

                <div className='m-2 '>
                    <button
                        onClick={openDialog}
                        className='opacity-60  rounded-lg text-gray-500 text-sm font-bold flex justify-center items-center gap-1 cursor-pointer  m-auto size-full border-1 border-gray-600 !border-dashed  p-4 hover:bg-gray-900'
                    >
                        <PlusIcon width={30} height={30} strokeWidth={2} />
                    </button>
                </div>
            </ul>
        </div>
    );
};

export default ProjectListLayout;
