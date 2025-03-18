import { Link } from "@/types/link";
import { Fragment, useState } from "react";
import { GlobeAltIcon, MinusCircleIcon } from "@heroicons/react/24/solid";
import { StarIcon } from "@heroicons/react/24/outline";
import {
    PencilSquareIcon,
    TrashIcon,
    FireIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import useLinks from "@/hooks/useLinks";

const LinkCard = ({
    type = "link",
    link,
    openLinkPage,
    updateLinkPage,
    deleteLinkPage,
    activeCard,
    deleteLinkFromProject,
}: {
    type: "link" | "project";
    link: Link | any;
    openLinkPage: any;
    updateLinkPage: any;
    deleteLinkPage: any;
    activeCard: any;
    deleteLinkFromProject?: any;
}) => {
    const [loadFavicon, setLoadFavicon] = useState(true);
    const [loadThumbnail, setLoadThumbnail] = useState(true);

    const { addBookmark } = useLinks();

    return (
        <motion.div
            initial={{ x: "-1%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "tween", duration: 1.2 }}
            className='relative  h-[270px] cursor-pointer shadow-md ring-1 ring-gray-700 rounded-lg'
        >
            {loadThumbnail && link?.og_data.thumbnail_url !== null ? (
                <img
                    src={link?.og_data.thumbnail_url}
                    alt='Bold typography'
                    className='block object-cover size-full rounded-lg '
                    onError={() => {
                        setLoadThumbnail(false);
                    }}
                />
            ) : (
                <div className='flex w-full gap-2 items-center justify-center h-full bg-[#070c14] rounded-lg line-clamp-2 '>
                    <div className='mx-6 w-full flex  gap-1.5 items-center justify-center h-full line-clamp-2 '>
                        <p className='text-sm font-light line-clamp-2  text-white'>
                            {link?.title}
                        </p>
                        <div className='shrink'>
                            <FireIcon
                                width={26}
                                height={26}
                                className='text-red-400 '
                            />
                        </div>
                    </div>
                </div>
            )}

            {activeCard !== null && link?.id === activeCard?.id && (
                <motion.div
                    whileHover={{ opacity: 1, transition: { delay: 0 } }}
                    initial={{ opacity: 0 }}
                    className='absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] text-white flex items-end rounded-lg'
                >
                    <div
                        className={[
                            "absolute size-full left-0 right-0 top-0 bottom-0 py-2.5 px-3 text-white bg-[rgba(0,0,0,0.3)] rounded-lg flex flex-col justify-between truncate",
                        ]
                            .filter(Boolean)
                            .join(" ")}
                    >
                        <div className='w-full h-full flex flex-col gap-1 justify-start '>
                            <h1 className='font-bold text-lg truncate'>
                                {link?.title}
                            </h1>
                            <p className='text-xs line-clamp-3 whitespace-normal'>
                                {link?.og_data?.description}
                            </p>
                        </div>

                        <div className='flex flex-col gap-2 mb-4 text-xs'>
                            <button
                                onClick={() => {
                                    openLinkPage(link?.urls.official);
                                }}
                                className='text-center bg-gray-200 opacity-70 text-black font-semibold rounded-lg cursor-pointer py-1 hover:text-blue-700 hover:opacity-80'
                            >
                                Official
                            </button>

                            <button
                                onClick={() => {
                                    openLinkPage(link?.urls.package);
                                }}
                                className={[
                                    link?.urls.package.length === 0 ||
                                    link?.urls.package === undefined
                                        ? "opacity-50"
                                        : "opacity-70 hover:text-blue-700 hover:opacity-80",
                                    "text-center bg-gray-200 text-black font-semibold rounded-lg cursor-pointer py-1  ",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                            >
                                Package
                            </button>

                            <button
                                onClick={() => {
                                    openLinkPage(link?.urls.github);
                                }}
                                className={[
                                    link?.urls.github.length === 0 ||
                                    link?.urls.github === undefined
                                        ? "opacity-50"
                                        : "opacity-70 hover:text-blue-700 hover:opacity-80",
                                    "text-center bg-gray-200 text-black font-semibold rounded-lg cursor-pointer py-1  ",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                            >
                                Gitgub
                            </button>
                        </div>
                        <div>
                            <div className='w-full flex justify-between gap-2 truncate'>
                                <div className='shrink'>
                                    {loadFavicon &&
                                    link?.og_data.favicon !== null ? (
                                        <img
                                            className='h-5 w-5 object-contain rounded-lg'
                                            src={link?.og_data.favicon}
                                            alt=''
                                            onError={() => {
                                                setLoadFavicon(false);
                                            }}
                                        />
                                    ) : (
                                        <GlobeAltIcon width={20} height={20} />
                                    )}
                                </div>

                                <div className='flex items-center'>
                                    <div className='flex gap-3 items-center'>
                                        {type === "link" && (
                                            <Fragment>
                                                <button
                                                    onClick={() => {
                                                        addBookmark(link);
                                                    }}
                                                    className='cursor-pointer hover:text-gray-300'
                                                >
                                                    {link?.bookmark ? (
                                                        <StarIcon
                                                            fill='#ffd400'
                                                            stroke='#ffd400'
                                                            width={18}
                                                            height={18}
                                                        />
                                                    ) : (
                                                        <StarIcon
                                                            width={18}
                                                            height={18}
                                                        />
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        updateLinkPage(link);
                                                    }}
                                                    className='cursor-pointer hover:text-gray-300'
                                                >
                                                    <PencilSquareIcon
                                                        width={18}
                                                        height={18}
                                                    />
                                                </button>

                                                <button className='cursor-pointer hover:text-gray-300'>
                                                    <AlertDialog.Root>
                                                        <AlertDialog.Trigger>
                                                            <TrashIcon
                                                                width={18}
                                                                height={18}
                                                            />
                                                        </AlertDialog.Trigger>
                                                        <AlertDialog.Content maxWidth='450px'>
                                                            <AlertDialog.Title>
                                                                링크 삭제
                                                            </AlertDialog.Title>
                                                            <AlertDialog.Description size='2'>
                                                                삭제된 링크는
                                                                보존되지않습니다.
                                                                링크를
                                                                삭제하시겠습니까?
                                                            </AlertDialog.Description>

                                                            <Flex
                                                                gap='3'
                                                                mt='4'
                                                                justify='end'
                                                            >
                                                                <AlertDialog.Cancel>
                                                                    <Button
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
                                                                        onClick={() => {
                                                                            deleteLinkPage(
                                                                                link
                                                                            );
                                                                        }}
                                                                    >
                                                                        삭제
                                                                    </Button>
                                                                </AlertDialog.Action>
                                                            </Flex>
                                                        </AlertDialog.Content>
                                                    </AlertDialog.Root>
                                                </button>
                                            </Fragment>
                                        )}

                                        {type === "project" && (
                                            <button
                                                onClick={() => {
                                                    deleteLinkFromProject(
                                                        link.id
                                                    );
                                                }}
                                                className='cursor-pointer text-red-500 hover:text-red-600'
                                            >
                                                <MinusCircleIcon
                                                    width={22}
                                                    height={22}
                                                />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default LinkCard;
