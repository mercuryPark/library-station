import useLinks from "@/hooks/useLinks";
import { Link } from "@/types/link";
import _ from "lodash";
import { useState } from "react";
import LinkCard from "@/components/link/Card";

const ProjectContentsLayout = ({
    linksByProject,
}: {
    linksByProject: any[];
}) => {
    const [activeCard, setActiveCard] = useState<Link | null>(null);
    const { openLink, openEditDialog, deleteLink } = useLinks();

    return (
        <div className='col-span-5 p-[1rem] overflow-y-auto'>
            <div className='flex flex-wrap gap-4'>
                {_.map(linksByProject, (item: any) => {
                    return (
                        <div
                            key={`link-${item?.id}`}
                            className='relative'
                            onMouseOver={() => {
                                setActiveCard(item.links);
                            }}
                            onMouseLeave={() => {
                                setActiveCard(null);
                            }}
                        >
                            <LinkCard
                                link={item.links}
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

export default ProjectContentsLayout;
