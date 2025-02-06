import { Link } from "@/types/link";
import { useState } from "react";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/solid";

const LinkCard = ({ link }: { link: Link }) => {
    const [activeCard, setActiveCard] = useState(false);
    return (
        <div
            className='relative  w-[200px] h-[270px] '
            onMouseOver={() => {
                setActiveCard(true);
            }}
            onMouseLeave={() => {
                setActiveCard(false);
            }}
        >
            <img
                src={link.og_data.thumbnail_url}
                alt='Bold typography'
                className='block object-cover size-full rounded-lg '
            />
            {activeCard && (
                <div className='absolute left-0 right-0 top-0 bottom-0 text-white bg-[rgba(0,0,0,0.3)] rounded-lg flex flex-col justify-between'>
                    <div className='flex justify-end p-2'>
                        <EllipsisHorizontalCircleIcon width={30} height={30} />
                    </div>
                    <div className='size-full flex flex-col gap-2 flex-wrap justify-end p-2.5 '>
                        <h1 className='font-bold'>{link.title}</h1>
                        <div className='w-full flex gap-1 truncate'>
                            <img
                                className='h-5 w-5 object-contain rounded-lg'
                                src={link.og_data.favicon}
                                alt=''
                            />
                            <span className='font-semibold text-sm truncate'>
                                {link.url}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LinkCard;
