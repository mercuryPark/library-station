import { Dialog, Button, Flex, Text, TextField } from "@radix-ui/themes";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
    title: string;
    description: string;
};

const defaultValues: Inputs = {
    title: "",
    description: "",
};

const EditProjectDialog = ({
    dialog,
    closeDialog,
    updateProject,
}: {
    dialog: any;
    closeDialog: () => void;
    updateProject: any;
}) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        // formState: { errors },
    } = useForm<Inputs>({
        defaultValues,
    });

    const onSubmitEditProject = async (data: Inputs) => {
        try {
            await updateProject(dialog.data.id, data);

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

    useEffect(() => {
        if (dialog?.data) {
            setValue("title", dialog.data.title || "");
            setValue("description", dialog.data.description || "");
        }
    }, [dialog]);

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
                <form onSubmit={handleSubmit(onSubmitEditProject)}>
                    <Flex justify={"between"}>
                        <div>
                            <Dialog.Title>프로젝트 수정</Dialog.Title>
                            <Dialog.Description size='2' mb='4'>
                                프로젝트의 이름과 설명을 수정하세요.
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

export default EditProjectDialog;
