import { Link } from "@/types/link";

const RadioCard = ({
    item,
    selectedItems,
    setSelectedItems,
}: {
    item: Link;
    selectedItems: Link[];
    setSelectedItems: any;
}) => {
    const handleClickSelectItem = (item: Link) => {
        setSelectedItems((prev: Link[]) => {
            if (prev.includes(item)) {
                return prev.filter((i) => i.id !== item.id);
            }
            return [...prev, item];
        });
    };
    return (
        <div
            onClick={() => {
                handleClickSelectItem(item);
            }}
            className={[
                "bg-[#18181b] flex gap-2 items-center ring-1 ring-[#3f3f46] shadow-sm rounded-lg px-1.5 mr-1 my-1 ml-0.5 max-w-[200px] hover:bg-[#27272a]  z-50 cursor-pointer",
                selectedItems.includes(item) ? "bg-[#27272a] ring-2" : "",
                item.og_data.thumbnail_url ? "px-1.5" : "px-3 pb-1",
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {item.og_data.thumbnail_url && (
                <div className='size-12 object-contain flex flex-none items-center justify-center'>
                    <img
                        src={item.og_data.thumbnail_url}
                        alt=''
                        className='size-full py-1 rounded-lg'
                    />
                </div>
            )}
            <div className='text-xs'>
                <label className='cursor-pointer'>{item.title}</label>
                <p className='text-[8px] line-clamp-2 text-gray-300 '>
                    {item.og_data.description}
                </p>
            </div>
        </div>
    );
};
export default RadioCard;
