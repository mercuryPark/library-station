import { Dialog, Button, Flex, Text, TextField } from "@radix-ui/themes";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { API_GET_THUMBNAIL_IMAGE } from "@/service/link";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { creatDialogState } from "@/state/dialog";
import useLinks from "@/hooks/useLinks";

type Inputs = {
    title: string;
    official: string;
    package: string;
    github: string;
    bookmark: boolean;
};

const defaultValues: Inputs = {
    title: "",
    official: "",
    package: "",
    github: "",
    bookmark: false,
};

const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

const CreateLinkDialog = () => {
    const [thumbnailImage, setThumbnailImage] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues,
    });

    const [creatDialog, setCreatDialog] = useAtom(creatDialogState);
    const { addLink } = useLinks();

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

    // 컴포넌트 마운트 또는 다이얼로그가 열릴 때 초기화
    useEffect(() => {
        if (creatDialog.visible) {
            reset(defaultValues);
            setThumbnailImage(null);
        }
    }, [creatDialog.visible, reset]);

    return (
        <Dialog.Root open={creatDialog.visible}>
            {/* <Dialog.Trigger>
                <Button>Edit profile</Button>
            </Dialog.Trigger> */}

            <Dialog.Content
                id='dialog'
                maxWidth='550px'
                className='!bg-[#18181b] text-[#ecedee] !shadow-none'
            >
                <form onSubmit={handleSubmit(addLink)}>
                    <Flex justify={"between"}>
                        <div>
                            <Dialog.Title>라이브러리 링크 생성</Dialog.Title>
                            <Dialog.Description size='2' mb='4'>
                                자주 사용하는 라이브러리의 링크를 등록하세요.
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
                                    type='button'
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
                                placeholder='라이브러리 이름을 입력하세요'
                                className='!bg-[#18181b] !text-[#ecedee] shadow-none !ring-1 ring-[#3f3f46]'
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
                                {...register("official", {
                                    required:
                                        "공식 레퍼런스 URL을 입력해주세요",
                                    pattern: {
                                        value: urlPattern,
                                        message: "올바른 URL 형식이 아닙니다",
                                    },
                                })}
                                placeholder='https://example.com'
                                className='!bg-[#18181b] !text-[#ecedee] shadow-none !ring-1 ring-[#3f3f46] [&_input]:!bg-[#18181b] [&_input]:!text-[#ecedee] [&_input:autofill]:!bg-[#18181b] [&_input:autofill]:!text-[#ecedee] [&_input:-webkit-autofill]:!bg-[#18181b] [&_input:-webkit-autofill]:!text-[#ecedee] [&_input:-webkit-autofill]:!box-shadow-[0_0_0_30px_#18181b_inset] [&_input:-webkit-autofill]:!-webkit-text-fill-color-[#ecedee]'
                            />
                            {errors.official && (
                                <Text as='div' color='red' size='1' mt='1'>
                                    {errors.official.message}
                                </Text>
                            )}
                        </label>
                        <label>
                            <Text as='div' size='2' mb='1' weight='bold'>
                                패키지 관리자
                            </Text>
                            <TextField.Root
                                {...register("package", {
                                    pattern: {
                                        value: urlPattern,
                                        message: "올바른 URL 형식이 아닙니다",
                                    },
                                })}
                                placeholder='https://www.npmjs.com/package/example'
                                className='!bg-[#18181b] !text-[#ecedee] shadow-none !ring-1 ring-[#3f3f46] [&_input]:!bg-[#18181b] [&_input]:!text-[#ecedee] [&_input:autofill]:!bg-[#18181b] [&_input:autofill]:!text-[#ecedee] [&_input:-webkit-autofill]:!bg-[#18181b] [&_input:-webkit-autofill]:!text-[#ecedee] [&_input:-webkit-autofill]:!box-shadow-[0_0_0_30px_#18181b_inset] [&_input:-webkit-autofill]:!-webkit-text-fill-color-[#ecedee]'
                            />
                            {errors.package && (
                                <Text as='div' color='red' size='1' mt='1'>
                                    {errors.package.message}
                                </Text>
                            )}
                        </label>

                        <label>
                            <Text as='div' size='2' mb='1' weight='bold'>
                                Github
                            </Text>
                            <TextField.Root
                                {...register("github", {
                                    pattern: {
                                        value: urlPattern,
                                        message: "올바른 URL 형식이 아닙니다",
                                    },
                                })}
                                placeholder='https://github.com/example/repo'
                                className='!bg-[#18181b] !text-[#ecedee] shadow-none !ring-1 ring-[#3f3f46] [&_input]:!bg-[#18181b] [&_input]:!text-[#ecedee] [&_input:autofill]:!bg-[#18181b] [&_input:autofill]:!text-[#ecedee] [&_input:-webkit-autofill]:!bg-[#18181b] [&_input:-webkit-autofill]:!text-[#ecedee] [&_input:-webkit-autofill]:!box-shadow-[0_0_0_30px_#18181b_inset] [&_input:-webkit-autofill]:!-webkit-text-fill-color-[#ecedee]'
                            />
                            {errors.github && (
                                <Text as='div' color='red' size='1' mt='1'>
                                    {errors.github.message}
                                </Text>
                            )}
                        </label>

                        <label className='flex items-center gap-2'>
                            <input
                                type='checkbox'
                                {...register("bookmark")}
                                className='size-4'
                            />
                            <Text as='div' size='2' weight='bold'>
                                북마크에 추가
                            </Text>
                        </label>
                    </Flex>

                    <Flex gap='3' mt='4' justify='end'>
                        <Button
                            onClick={() => {
                                setCreatDialog({ visible: false });
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

export default CreateLinkDialog;
