import { useEffect, useState } from "react";
import LinkCard from "../link/Card";
import _ from "lodash";
import { Link } from "@/types/link";
import useLinks from "@/hooks/useLinks";

const BookmarkLayout = () => {
    const [activeCard, setActiveCard] = useState<Link | null>(null);
    const [loading, setLoading] = useState(false);
    const { links, deleteLink, openEditDialog, openLink, getLinks } = useLinks({
        setLoading,
    });

    useEffect(() => {
        // 첫번째 파라미터 bookmark가 true일 경우 북마크된 링크만 가져옴
        getLinks(true);
    }, []);

    return (
        <div className='p-[1rem] flex flex-col gap-3 w-full h-full overflow-y-auto'>
            <div className=' pb-3'>
                <h1 className='text-gray-200  text-xl'>자주 방문한 링크</h1>
            </div>
            {loading ? (
                <div className='flex items-center justify-center'>
                    <div className='w-10 h-10 border-t-transparent border-b-transparent border-r-transparent border-l-gray-200 rounded-full animate-spin' />
                </div>
            ) : (
                <div className='flex flex-wrap gap-4'>
                    {_.map(links, (link: Link | null) => {
                        return (
                            <div
                                key={`link-${link?.id}`}
                                className='relative'
                                onMouseOver={() => {
                                    setActiveCard(link);
                                }}
                                onMouseLeave={() => {
                                    setActiveCard(null);
                                }}
                            >
                                <LinkCard
                                    link={link}
                                    activeCard={activeCard}
                                    openLinkPage={(link: any) => {
                                        openLink(link);
                                    }}
                                    updateLinkPage={(link: any) => {
                                        openEditDialog(link);
                                    }}
                                    deleteLinkPage={(link: any) => {
                                        deleteLink(link);
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default BookmarkLayout;
