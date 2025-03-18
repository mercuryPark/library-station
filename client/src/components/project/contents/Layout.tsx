import useLinks from "@/hooks/useLinks";
import { Link } from "@/types/link";
import _ from "lodash";
import { useState } from "react";
import LinkCard from "@/components/link/Card";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";

const ProjectContentsLayout = ({
    activeProjectID,
    linksByProject,
    openAddLinkDialog,
    deleteLinkFromProject,
}: {
    activeProjectID: any;
    linksByProject: any[];
    openAddLinkDialog: any;
    deleteLinkFromProject: any;
}) => {
    const [activeCard, setActiveCard] = useState<Link | null>(null);
    const { openLink, openEditDialog, deleteLink } = useLinks();

    return (
        <div className='col-span-5 p-[1rem] overflow-y-auto'>
            {linksByProject.length > 0 ? (
                <div className='grid grid-cols-6 max-2xl:grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2  gap-4'>
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
                                    type='project'
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
                                    deleteLinkFromProject={(link: any) => {
                                        deleteLinkFromProject(
                                            activeProjectID,
                                            link
                                        );
                                    }}
                                />
                            </div>
                        );
                    })}

                    <div
                        onClick={() => {
                            openAddLinkDialog(activeProjectID, null);
                        }}
                        className='h-[270px] outline-2 outline-dashed outline-gray-600  opacity-30 rounded-lg szie-f flex justify-center items-center hover:bg-gray-800 cursor-pointer'
                    >
                        <button className='p-4 rounded-full text-gray-500 text-sm font-bold gap-1 cursor-pointer '>
                            <PlusIcon width={60} height={60} strokeWidth={3} />
                        </button>
                    </div>
                </div>
            ) : (
                <div className='h-full flex flex-col items-center justify-center gap-5'>
                    <MagnifyingGlassIcon className='w-16 h-16 text-gray-400' />
                    <p className='text-gray-400'>프로젝트를 선택해주세요.</p>
                </div>
            )}
        </div>
    );
};

export default ProjectContentsLayout;
