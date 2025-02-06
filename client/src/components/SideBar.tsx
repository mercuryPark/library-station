import _ from "lodash";

const SideBar = () => {
    const menu = [
        { label: "Logo", icon: "" },
        { label: "Home", icon: "" },
        { label: "Bookmark", icon: "" },
        { label: "Project", icon: "" },
    ];
    return (
        <div className='w-[72px] h-full border-r-1 border-gray-200 shadow-sm '>
            <ul className='flex flex-col gap-4 my-4'>
                {_.map(menu, (item) => {
                    return (
                        <li className='size-12 m-auto ring-1 !text-xs rounded-full'>
                            <button className='h-full m-auto w-full cursor-pointer'>
                                <p>{item.label}</p>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default SideBar;
