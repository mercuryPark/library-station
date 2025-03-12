import { Dialog, Button, Flex, Text, TextField } from "@radix-ui/themes";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { API_GET_THUMBNAIL_IMAGE } from "@/service/link";
import { useForm } from "react-hook-form";
import { editDialogState } from "@/state/dialog";
import { useAtom } from "jotai";
import { LinkDialog } from "@/types/dialog";
import useLinks from "@/hooks/useLinks";

type Inputs = {
    title: string;
    official: string;
    package: string;
    github: string;
};
const UpdateLinkDialog = () => {
    const [thumbnailImage, setThumbnailImage] = useState(null);
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        // formState: { errors },
    } = useForm<Inputs>();

    const [editDialog, setEditDialog]: any =
        useAtom<LinkDialog>(editDialogState);

    const { updateLink } = useLinks();

    const handleSumitUpdateLink = async (data: any) => {
        await updateLink(editDialog.data.id, data);
    };

    // og tag로 썸네일 가져오기
    const getThumbnailImage = async () => {
        try {
            const result = await API_GET_THUMBNAIL_IMAGE({
                url: watch("official"),
            });
            setThumbnailImage(result.data.data.og_data.thumbnail_url);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (thumbnailImage !== null) {
            setThumbnailImage(null);
        }
    }, []);

    useEffect(() => {
        if (editDialog?.data) {
            setValue("title", editDialog.data.title || "");
            setValue("official", editDialog.data.urls?.official || "");
            setValue("package", editDialog.data.urls?.package || "");
            setValue("github", editDialog.data.urls?.github || "");
        }
    }, [editDialog]);

    return (
        <Dialog.Root open={editDialog?.visible}>
            {/* <Dialog.Trigger>
                <Button>Edit profile</Button>
            </Dialog.Trigger> */}

            <Dialog.Content
                id='dialog'
                maxWidth='550px'
                className='!bg-[#18181b] text-[#ecedee] !shadow-none'
            >
                <form onSubmit={handleSubmit(handleSumitUpdateLink)}>
                    <Flex justify={"between"}>
                        <div>
                            <Dialog.Title>라이브러리 링크 수정</Dialog.Title>
                            <Dialog.Description size='2' mb='4'>
                                가지고있는 라이브러리 링크를 수정하세요.
                            </Dialog.Description>
                        </div>

                        <div className='flex items-center justify-center w-[80px] rounded-lg ring-1 ring-[#3f3f46] shadow-sm'>
                            {thumbnailImage !== null ? (
                                <img
                                    src={thumbnailImage}
                                    alt=''
                                    className='object-contain size-full rounded-lg'
                                    onError={() => {
                                        setThumbnailImage(null);
                                    }}
                                />
                            ) : (
                                <button
                                    className='cursor-pointer'
                                    onClick={getThumbnailImage}
                                >
                                    <ArrowPathIcon
                                        width={15}
                                        height={15}
                                        color='#ecedee'
                                    />
                                </button>
                            )}
                        </div>
                    </Flex>
                    <Flex direction='column' gap='3'>
                        <label>
                            <div className='flex justify-between items-center'>
                                <Text as='div' size='2' mb='1' weight='bold'>
                                    카드 제목
                                </Text>
                            </div>
                            <TextField.Root
                                {...register("title", { required: true })}
                                placeholder='Enter your full name'
                                className='!bg-[#18181b] !text-[#ecedee] shadow-none !ring-1 ring-[#3f3f46] '
                            />
                        </label>
                        <label>
                            <div className='flex justify-between items-center'>
                                <Text as='div' size='2' mb='1' weight='bold'>
                                    공식 레퍼런스
                                </Text>
                                <button
                                    type='button'
                                    className='text-[10px] font-semibold text-blue-400'
                                    onClick={getThumbnailImage}
                                >
                                    썸네일 미리보기
                                </button>
                            </div>
                            <TextField.Root
                                {...register("official", { required: true })}
                                placeholder='Enter your full name'
                                className='!bg-[#18181b] !text-[#ecedee] shadow-none !ring-1 ring-[#3f3f46]'
                            />
                        </label>
                        <label>
                            <Text as='div' size='2' mb='1' weight='bold'>
                                패키지 관리자
                            </Text>
                            <TextField.Root
                                {...register("package")}
                                placeholder='Enter your email'
                                className='!bg-[#18181b] !text-[#ecedee] shadow-none !ring-1 ring-[#3f3f46]'
                            />
                        </label>

                        <label>
                            <Text as='div' size='2' mb='1' weight='bold'>
                                Github
                            </Text>
                            <TextField.Root
                                {...register("github")}
                                placeholder='Enter your email'
                                className='!bg-[#18181b] !text-[#ecedee] shadow-none !ring-1 ring-[#3f3f46]'
                            />
                        </label>
                    </Flex>

                    <Flex gap='3' mt='4' justify='end'>
                        <Button
                            onClick={() => {
                                setEditDialog({ data: null, visible: false });
                            }}
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

export default UpdateLinkDialog;
