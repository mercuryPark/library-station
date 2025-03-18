import { Dialog, Button, Flex } from "@radix-ui/themes";
import { useAtomValue } from "jotai";
import { linksState } from "@/state/links";
import { useEffect, useState } from "react";
import RadioCard from "@/components/link/RadioCard";
import _ from "lodash";

const AddLinkDialog = ({
    dialog,
    closeDialog,
    addLinksToProject,
    linksByProject,
    activeProjectID,
}: {
    dialog: any;
    closeDialog: () => void;
    addLinksToProject: any;
    linksByProject: any;
    activeProjectID: string | null;
}) => {
    const links = useAtomValue(linksState);
    const [availableLinks, setAvailableLinks] = useState<any[]>([]);
    const [selectedLinks, setSelectedLinks] = useState<any[]>([]);

    const onSubmitCreateProject = async () => {
        const linkIds = selectedLinks.map((link) => link.id);
        try {
            await addLinksToProject(activeProjectID, linkIds);

            closeDialog();
        } catch (err) {
            console.error("프로젝트 생성 중 오류 발생:", err);
            // 에러 처리 로직 추가 (예: 토스트 메시지 표시)
        }
    };

    // 컴포넌트 마운트 또는 다이얼로그가 열릴 때 초기화
    useEffect(() => {
        if (dialog.visible) {
            setSelectedLinks([]);
        }
    }, [dialog.visible]);

    useEffect(() => {
        setAvailableLinks(() => {
            return _.filter(links, (link) => {
                return !_.some(
                    linksByProject,
                    (projectLink) => projectLink.links.id === link.id
                );
            });
        });
    }, [links, linksByProject]);

    return (
        <Dialog.Root open={dialog.visible}>
            <Dialog.Content
                id='dialog'
                maxWidth='550px'
                className='!bg-[#18181b] text-[#ecedee] !shadow-none'
            >
                <div>
                    <Flex justify={"between"}>
                        <div>
                            <Dialog.Title>프로젝트 링크 추가</Dialog.Title>
                            <Dialog.Description size='2' mb='4'>
                                프로젝트안에 링크를 추가하세요.
                            </Dialog.Description>
                        </div>
                    </Flex>
                    <Flex direction='column' gap='3'>
                        <div>
                            {availableLinks && availableLinks.length > 0 ? (
                                <div className='max-h-[300px] overflow-y-auto flex flex-wrap gap-1'>
                                    {availableLinks.map((link) => (
                                        <RadioCard
                                            key={link.id}
                                            item={link}
                                            selectedItems={selectedLinks}
                                            setSelectedItems={setSelectedLinks}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className='text-sm text-gray-500'>
                                    추가할 링크가 없습니다.
                                </div>
                            )}
                        </div>
                    </Flex>

                    <Flex gap='3' mt='4' justify='end'>
                        <Button
                            onClick={closeDialog}
                            variant='soft'
                            color='red'
                            type='button'
                        >
                            Cancel
                        </Button>
                        {availableLinks && availableLinks.length > 0 && (
                            <Button
                                type='submit'
                                onClick={onSubmitCreateProject}
                            >
                                Save
                            </Button>
                        )}
                    </Flex>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
};
export default AddLinkDialog;
