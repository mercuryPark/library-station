import { useEffect, useState } from "react";
import Search from "../Search";
import LinkCard from "../../assets/common/Card";
import _ from "lodash";
import { Link } from "@/types/link";
import useLinks from "@/hooks/useLinks";
import Empty from "@/assets/common/Empty";

const HomeLayout = () => {
    const [activeCard, setActiveCard] = useState<Link | null>(null);
    const {
        loading,
        links,
        filteredLinks,
        deleteLink,
        openEditDialog,
        openLink,
        getLinks,
        openAddDialog,
    } = useLinks();

    const displayedLinks = filteredLinks ?? links;

    useEffect(() => {
        if (!links || links?.length === 0) {
            getLinks();
        }
    }, []);

    if (loading) {
        return (
            <div className='fixed inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm'>
                <div className='relative w-16 h-16'>
                    <div className='absolute top-0 left-0 w-full h-full rounded-full border-4 border-gray-700/50'></div>
                    <div className='absolute top-0 left-0 w-full h-full rounded-full border-4 border-blue-400 border-t-transparent animate-spin'></div>
                </div>
            </div>
        );
    }

    if (links.length === 0) {
        return <Empty onAddClick={openAddDialog} />;
    }

    return (
        <div className='p-[1rem] flex flex-col gap-3 w-full h-full overflow-y-auto'>
            <Search />

            <div className='grid grid-cols-7 max-2xl:grid-cols-6 max-xl:grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 gap-4'>
                {_.map(displayedLinks, (link: Link | null) => {
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
                                type='link'
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
        </div>
    );
};

export default HomeLayout;
