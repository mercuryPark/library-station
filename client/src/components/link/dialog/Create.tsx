import { Dialog, Button, Flex, Text, TextField } from "@radix-ui/themes";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { API_GET_THUMBNAIL_IMAGE, API_SAVE_LINKS } from "@/service/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAtom } from "jotai";
import { creatDialogState } from "@/state/dialog";
import { linksState } from "@/state/links";
import { useNavigate } from "react-router-dom";

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

const CreateLinkDialog = () => {
    const [thumbnailImage, setThumbnailImage] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        // formState: { errors },
    } = useForm<Inputs>({
        defaultValues,
    });

    const navigation = useNavigate();

    const [, setLinks]: any = useAtom(linksState);
    const [creatDialog, setCreatDialog] = useAtom(creatDialogState);

    // 새 링크 저장
    const handleClickSaveLinks: SubmitHandler<Inputs> = async (data: any) => {
        const params = {
            urls: {
                official: data.official,
                package: data.package ?? null,
                github: data.github ?? null,
            },
            bookmark: data.bookmark,
            title: data.title,
        };
        try {
            const res = await API_SAVE_LINKS(params);

            if (res && res.data.data != undefined) {
                if (window.location.href !== "/") {
                    navigation("/");
                }
                setLinks((prev: any) => {
                    return [res.data.data, ...prev];
                });

                setCreatDialog({ visible: false });
            }
        } catch (err) {
            console.log(err);
        }
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

            <Dialog.Content maxWidth='550px'>
                <form onSubmit={handleSubmit(handleClickSaveLinks)}>
                    <Flex justify={"between"}>
                        <div>
                            <Dialog.Title>라이브러리 링크 생성</Dialog.Title>
                            <Dialog.Description size='2' mb='4'>
                                자주 사용하는 라이브러리의 링크를 등록하세요.
                            </Dialog.Description>
                        </div>

                        <div className='flex items-center justify-center w-[80px] rounded-lg ring-1 ring-gray-200 shadow-sm'>
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
                                        color='gray'
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
                            />
                        </label>
                        <label>
                            <div className='flex justify-between items-center'>
                                <Text as='div' size='2' mb='1' weight='bold'>
                                    공식 레퍼런스
                                </Text>
                                <button
                                    type='button'
                                    className='text-[10px] font-semibold text-blue-600'
                                    onClick={getThumbnailImage}
                                >
                                    썸네일 미리보기
                                </button>
                            </div>
                            <TextField.Root
                                {...register("official", { required: true })}
                                placeholder='Enter your full name'
                            />
                        </label>
                        <label>
                            <Text as='div' size='2' mb='1' weight='bold'>
                                패키지 관리자
                            </Text>
                            <TextField.Root
                                {...register("package")}
                                placeholder='Enter your email'
                            />
                        </label>

                        <label>
                            <Text as='div' size='2' mb='1' weight='bold'>
                                Github
                            </Text>
                            <TextField.Root
                                {...register("github")}
                                placeholder='Enter your email'
                            />
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
                            color='gray'
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
