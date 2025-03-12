import { DropdownMenu } from "radix-ui";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useState } from "react";

const ProjectListOptions = ({
    deleteProject,
    project,
    openEditDialog,
}: {
    deleteProject: (id: string) => void;
    project: any;
    openEditDialog: (id: string, data: any) => void;
}) => {
    const [open, setOpen] = useState(false);

    const handleModify = (e: React.MouseEvent) => {
        e.stopPropagation();
        openEditDialog(project.id, project);
        setOpen(false);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        deleteProject(project.id);
        setOpen(false);
    };

    return (
        <DropdownMenu.Root open={open} onOpenChange={setOpen}>
            <DropdownMenu.Trigger asChild onClick={handleModify}>
                <EllipsisVerticalIcon className='w-5 h-5 text-gray-300' />
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className='min-w-[100px] rounded-md bg-gray-800  text-gray-300 p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade'
                    sideOffset={5}
                >
                    <DropdownMenu.Item
                        className='group relative hover:bg-gray-700 flex h-[30px] select-none items-center rounded-[3px] pl-[10px] pr-[5px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 cursor-pointer'
                        onSelect={(e) => e.preventDefault()}
                    >
                        <button
                            className='size-full text-start cursor-pointer'
                            onClick={handleModify}
                        >
                            수정
                        </button>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                        className='group hover:bg-gray-700 relative flex h-[30px] select-none items-center rounded-[3px] pl-[10px] pr-[5px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 cursor-pointer text-red-600'
                        onSelect={(e) => e.preventDefault()}
                    >
                        <button className='cursor-pointer hover:text-gray-300 size-full'>
                            <AlertDialog.Root>
                                <AlertDialog.Trigger>
                                    <button className='w-full text-start cursor-pointer'>
                                        삭제
                                    </button>
                                </AlertDialog.Trigger>
                                <AlertDialog.Content maxWidth='450px'>
                                    <AlertDialog.Title>
                                        프로젝트 삭제
                                    </AlertDialog.Title>
                                    <AlertDialog.Description size='2'>
                                        삭제된 링크는 보존되지않습니다. 링크를
                                        삭제하시겠습니까?
                                    </AlertDialog.Description>

                                    <Flex gap='3' mt='4' justify='end'>
                                        <AlertDialog.Cancel>
                                            <Button
                                                onClick={() => {
                                                    setOpen(false);
                                                }}
                                                variant='soft'
                                                color='gray'
                                            >
                                                취소
                                            </Button>
                                        </AlertDialog.Cancel>
                                        <AlertDialog.Action>
                                            <Button
                                                variant='solid'
                                                color='red'
                                                onClick={handleDelete}
                                            >
                                                삭제
                                            </Button>
                                        </AlertDialog.Action>
                                    </Flex>
                                </AlertDialog.Content>
                            </AlertDialog.Root>
                        </button>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default ProjectListOptions;
