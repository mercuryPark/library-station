import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";
import { DropdownMenu } from "@radix-ui/themes";

const LinkDropDown = () => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className='absolute top-2 right-2'>
                <button>
                    <EllipsisHorizontalCircleIcon width={30} height={30} />
                </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className='z-[999999]'>
                <DropdownMenu.Item shortcut='⌘ E'>Edit</DropdownMenu.Item>
                <DropdownMenu.Item shortcut='⌘ D'>Duplicate</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item shortcut='⌘ N'>Archive</DropdownMenu.Item>

                <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
                    <DropdownMenu.SubContent>
                        <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
                        <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>

                        <DropdownMenu.Separator />
                        <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
                    </DropdownMenu.SubContent>
                </DropdownMenu.Sub>

                <DropdownMenu.Separator />
                <DropdownMenu.Item>Share</DropdownMenu.Item>
                <DropdownMenu.Item>Add to favorites</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item shortcut='⌘ ⌫' color='red'>
                    Delete
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};

export default LinkDropDown;
