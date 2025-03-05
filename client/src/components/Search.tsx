import { TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useAtom, useAtomValue } from "jotai";
import { filteredLinksState, linksState } from "@/state/links";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import { Link } from "@/types/link";

const Search = () => {
    const links = useAtomValue(linksState);
    const [, setFilteredLinks] = useAtom(filteredLinksState);
    const [originalLinks, setOriginalLinks] = useState<Link[]>(links);

    // 디바운스 적용된 검색 핸들러
    const handleSearch = useCallback(
        _.debounce((value: string) => {
            if (value === "" || !value || !value.trim()) {
                setFilteredLinks(null);
                return;
            }

            // 검색어로 title 필터링
            const filteredLinks = originalLinks.filter((link) =>
                link.title.toLowerCase().includes(value.toLowerCase())
            );

            setFilteredLinks(filteredLinks);
        }, 300),
        [originalLinks, links]
    );

    // 입력 변경 핸들러
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!value || value.trim() === "") {
            setFilteredLinks(null);
        }
        handleSearch(value);
    };

    useEffect(() => {
        setOriginalLinks(links);
    }, [links]);

    return (
        <div className='w-full'>
            <TextField.Root
                className='w-full bg-transparent px-3 py-2 outline-none'
                placeholder='라이브러리 검색...'
                onChange={handleInputChange}
            >
                <TextField.Slot>
                    <MagnifyingGlassIcon height='16' width='16' />
                </TextField.Slot>
            </TextField.Root>
        </div>
    );
};

export default Search;
