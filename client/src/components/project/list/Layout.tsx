import ListItem from "./ListItem";
import _ from "lodash";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const ProjectListLayout = ({
    projects,
    openDialog,
    deleteProject,
}: {
    projects: any;
    openDialog: () => void;
    deleteProject: (id: string) => void;
}) => {
    return (
        <div className='col-span-1 h-full border-r-1 border-gray-700'>
            <div className='flex items-center justify-between w-full  border-b-1 border-gray-600 hover:bg-gray-800'>
                <button
                    onClick={openDialog}
                    className='p-4 text-gray-200 text-sm font-bold flex justify-center items-center gap-1 w-full h-full cursor-pointer '
                >
                    프로젝트 추가하기
                    <PlusCircleIcon width={20} height={20} />
                </button>
            </div>
            <ul className='flex flex-col  overflow-y-auto'>
                {_.map(projects, (project) => {
                    return (
                        <ListItem
                            key={project.id}
                            project={project}
                            deleteProject={deleteProject}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

export default ProjectListLayout;
