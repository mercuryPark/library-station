import { useEffect, useState } from "react";
import Search from "../Search";
import LinkCard from "../link/Card";
import _ from "lodash";
import { Link } from "@/types/link";
import useLinks from "@/hooks/useLinks";

const HomeLayout = () => {
    const [activeCard, setActiveCard] = useState<Link | null>(null);
    const {
        links,
        filteredLinks,
        deleteLink,
        openEditDialog,
        openLink,
        getLinks,
    } = useLinks();

    useEffect(() => {
        getLinks();
    }, []);

    return (
        <div className='p-[1rem] flex flex-col gap-3 w-full'>
            <Search />

            <div className='flex flex-wrap gap-4'>
                {_.map(filteredLinks ?? links, (link: Link | null) => {
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
        </div>
    );
};

export default HomeLayout;
