import { useNavigate } from "react-router-dom";
import ProjectListOptions from "./Options";

const ListItem = ({
    project,
    activeProjectID,
    deleteProject,
    openEditDialog,
}: {
    project: any;
    activeProjectID: string | null;
    deleteProject: (id: string) => void;
    openEditDialog: (id: string, data: any) => void;
}) => {
    const navigation = useNavigate();
    return (
        <li
            className={[
                project.id === activeProjectID && "bg-gray-800 ",
                "cursor-pointer flex text-gray-300 px-4 py-4 items-center justify-between  hover:bg-gray-800 border-b-1 border-gray-700",
            ]
                .filter(Boolean)
                .join(" ")}
            onClick={() => {
                navigation(`/project/${project.id}`);
            }}
        >
            <div className='flex flex-col gap-1  justify-between '>
                <h1 className='text-sm font-bold'>{project.title}</h1>
                <p className='text-xs'>{project.description}</p>
            </div>

            <ProjectListOptions
                deleteProject={deleteProject}
                project={project}
                openEditDialog={openEditDialog}
            />
        </li>
    );
};

export default ListItem;
