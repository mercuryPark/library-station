import { DropdownMenu } from "radix-ui";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

const ProjectListOptions = ({
    deleteProject,
    project,
}: {
    deleteProject: (id: string) => void;
    project: any;
}) => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <EllipsisVerticalIcon className='w-5 h-5 text-gray-300' />
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className='min-w-[100px] rounded-md bg-gray-800  text-gray-300 p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade'
                    sideOffset={5}
                >
                    <DropdownMenu.Item className='group relative hover:bg-gray-700 flex h-[30px] select-none items-center rounded-[3px] pl-[10px] pr-[5px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 cursor-pointer'>
                        <button>수정</button>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className='group hover:bg-gray-700 relative flex h-[30px] select-none items-center rounded-[3px] pl-[10px] pr-[5px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 cursor-pointer text-red-600'>
                        <button
                            onClick={() => {
                                deleteProject(project.id);
                            }}
                        >
                            삭제
                        </button>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default ProjectListOptions;
