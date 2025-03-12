import { Dialog, Button, Flex, Text, TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAtomValue } from "jotai";
import { linksState } from "@/state/links";
import RadioCard from "@/components/link/RadioCard";
import _ from "lodash";

interface Project {
    id: string;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

type Inputs = {
    title: string;
    description: string;
};

const defaultValues: Inputs = {
    title: "",
    description: "",
};

const CreateProjectDialog = ({
    dialog,
    closeDialog,
    createProject,
    addLinksToProject,
}: {
    dialog: any;
    closeDialog: () => void;
    createProject: (data: Inputs) => Promise<Project>;
    addLinksToProject: (id: string, linkIds: string[]) => Promise<void>;
}) => {
    const {
        register,
        handleSubmit,
        reset,
        // formState: { errors },
    } = useForm<Inputs>({
        defaultValues,
    });

    const links = useAtomValue(linksState);
    const [selectedLinks, setSelectedLinks] = useState<any[]>([]);

    const onSubmitCreateProject = async (data: Inputs) => {
        try {
            const createdProject: any = await createProject(data);

            if (createdProject) {
                const linksIds = _.map(selectedLinks, (link) => link.id);
                await addLinksToProject(createdProject.id, linksIds);
            } else {
                throw new Error("프로젝트 생성 실패");
            }

            closeDialog();
        } catch (err) {
            console.error("프로젝트 생성 중 오류 발생:", err);
            // 에러 처리 로직 추가 (예: 토스트 메시지 표시)
        } finally {
            reset(defaultValues);
        }
    };

    // 컴포넌트 마운트 또는 다이얼로그가 열릴 때 초기화
    useEffect(() => {
        if (dialog.visible) {
            reset(defaultValues);
        }
    }, [dialog.visible, reset]);

    return (
        <Dialog.Root open={dialog.visible}>
            {/* <Dialog.Trigger>
                <Button>Edit profile</Button>
            </Dialog.Trigger> */}

            <Dialog.Content
                id='dialog'
                maxWidth='550px'
                className='!bg-[#18181b] text-[#ecedee] !shadow-none'
            >
                <form onSubmit={handleSubmit(onSubmitCreateProject)}>
                    <Flex justify={"between"}>
                        <div>
                            <Dialog.Title>프로젝트 생성</Dialog.Title>
                            <Dialog.Description size='2' mb='4'>
                                프로젝트를 생성해 링크를 그룹별로 관리해 보세요.
                            </Dialog.Description>
                        </div>
                    </Flex>
                    <Flex direction='column' gap='3'>
                        <label>
                            <div className='flex justify-between items-center'>
                                <Text as='div' size='2' mb='1' weight='bold'>
                                    이름
                                </Text>
                            </div>
                            <TextField.Root
                                {...register("title", { required: true })}
                                placeholder='Enter your full name'
                                className='!bg-[#18181b] !text-[#ecedee] shadow-none !ring-1 ring-[#3f3f46]'
                            />
                        </label>
                        <label>
                            <div className='flex justify-between items-center'>
                                <Text as='div' size='2' mb='1' weight='bold'>
                                    설명
                                </Text>
                            </div>
                            <TextField.Root
                                {...register("description", { required: true })}
                                placeholder='Enter your full name'
                                className='!bg-[#18181b] !text-[#ecedee] shadow-none !ring-1 ring-[#3f3f46]'
                            />
                        </label>

                        <div>
                            <Text as='div' size='2' mb='1' weight='bold'>
                                링크 추가
                            </Text>
                            <div className='max-h-[300px] overflow-y-auto flex flex-wrap gap-1'>
                                {links.map((link) => (
                                    <RadioCard
                                        key={link.id}
                                        item={link}
                                        selectedItems={selectedLinks}
                                        setSelectedItems={setSelectedLinks}
                                    />
                                ))}
                            </div>
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
                        <Button type='submit'>Save</Button>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default CreateProjectDialog;
