import _ from "lodash";
import {
    StarIcon,
    HomeIcon,
    PlusCircleIcon,
    // MagnifyingGlassCircleIcon,
    ClipboardDocumentListIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { creatDialogState } from "@/state/dialog";
import { useAuth } from "@/contexts/AuthContext";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";

const SideBar = () => {
    const { user, signOut } = useAuth();
    const navigation = useNavigate();
    const [, setCreateDialog] = useAtom(creatDialogState);

    console.log(user);
    const menu = [
        {
            label: "Home",
            icon: (
                <HomeIcon
                    width={25}
                    height={25}
                    stroke='#94a3b8'
                    onClick={() => {
                        navigation("/");
                    }}
                />
            ),
        },
        {
            label: "Update",
            icon: (
                <PlusCircleIcon
                    width={25}
                    height={25}
                    stroke='#94a3b8'
                    onClick={() => {
                        setCreateDialog({
                            visible: true,
                        });
                    }}
                />
            ),
        },
        {
            label: "Bookmark",
            icon: (
                <StarIcon
                    width={25}
                    height={25}
                    stroke='#94a3b8'
                    onClick={() => {
                        navigation("/bookmark");
                    }}
                />
            ),
        },
        {
            label: "Project",
            icon: (
                <ClipboardDocumentListIcon
                    width={25}
                    height={25}
                    stroke='#94a3b8'
                    onClick={() => {
                        navigation("/project");
                    }}
                />
            ),
        },
        // {
        //     label: "npm",
        //     icon: (
        //         <MagnifyingGlassCircleIcon
        //             width={25}
        //             height={25}
        //             stroke='#94a3b8'
        //         />
        //     ),
        // },
    ];
    return (
        <div className='w-[72px] h-full border-r-1 border-gray-700 shadow-sm py-6 flex flex-col items-center gap-6 '>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <button className='cursor-pointer'>
                        <div className='size-10 shadow-lg rounded-full '>
                            {user?.user_metadata.avatar_url ? (
                                <img
                                    src={user?.user_metadata.avatar_url}
                                    alt=''
                                    className='rounded-full size-full'
                                />
                            ) : (
                                <div className='rounded-full size-full flex justify-center items-center '>
                                    <UserCircleIcon
                                        width={32}
                                        height={32}
                                        stroke='#94a3b8'
                                    />
                                </div>
                            )}
                        </div>
                    </button>
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
                                // onClick={handleModify}
                            >
                                {user?.email}
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
                                            로그아웃
                                        </button>
                                    </AlertDialog.Trigger>
                                    <AlertDialog.Content maxWidth='450px'>
                                        <AlertDialog.Title>
                                            로그아웃
                                        </AlertDialog.Title>
                                        <AlertDialog.Description size='2'>
                                            로그아웃 하시겠습니까?
                                        </AlertDialog.Description>

                                        <Flex gap='3' mt='4' justify='end'>
                                            <AlertDialog.Cancel>
                                                <Button
                                                    // onClick={() => {
                                                    //     setOpen(false);
                                                    // }}
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
                                                    onClick={signOut}
                                                >
                                                    확인
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

            <ul className='flex flex-col gap-4 '>
                {_.map(menu, (item) => {
                    return (
                        <li
                            key={`menu-${item?.label}`}
                            className='size-12 m-auto !text-xs rounded-full '
                        >
                            <button className='h-full m-auto w-full cursor-pointer flex justify-center items-center'>
                                <p>{item.icon}</p>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default SideBar;
