import _ from "lodash";
import {
    StarIcon,
    HomeIcon,
    PlusCircleIcon,
    MagnifyingGlassCircleIcon,
    ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { creatDialogState } from "@/state/dialog";

const SideBar = () => {
    const navigation = useNavigate();
    const [, setCreateDialog] = useAtom(creatDialogState);
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
        {
            label: "npm",
            icon: (
                <MagnifyingGlassCircleIcon
                    width={25}
                    height={25}
                    stroke='#94a3b8'
                />
            ),
        },
    ];
    return (
        <div className='w-[72px] h-full border-r-1 border-gray-700 shadow-sm py-6 flex flex-col items-center gap-6 '>
            {/* logo */}
            <div className='size-10 shadow-lg rounded-full bg-gray-500'>
                <button className='h-full m-auto w-full cursor-pointer'></button>
            </div>

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
