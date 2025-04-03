import { Plus } from "lucide-react";

interface EmptyProps {
    onAddClick: () => void;
}

const Empty = ({ onAddClick }: EmptyProps) => {
    return (
        <div className='flex flex-col items-center justify-center h-[70vh] animate-fade-in'>
            {/* 일러스트레이션 */}
            <div className='w-48 h-48 mb-8 relative'>
                <div className='absolute inset-0 bg-gray-800 rounded-full' />
                <div className='absolute inset-0 flex items-center justify-center'>
                    <svg
                        className='w-24 h-24 text-gray-300'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={1.5}
                            d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                        />
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={1.5}
                            d='M12 8v4m0 0v4m0-4h4m-4 0H8'
                            className='text-blue-400'
                        />
                    </svg>
                </div>
            </div>

            {/* 텍스트 */}
            <h3 className='text-xl font-semibold text-gray-500 mb-2'>
                아직 북마크된 링크가 없어요
            </h3>
            <p className='text-gray-500 mb-8 text-center max-w-sm'>
                자주 방문하는 웹사이트나 프로젝트를 북마크해보세요
            </p>

            {/* 버튼 */}
            <button
                onClick={onAddClick}
                className='inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                aria-label='새 링크 추가하기'
            >
                <Plus className='w-5 h-5' />
                <span>새 링크 추가하기</span>
            </button>
        </div>
    );
};

export default Empty;
