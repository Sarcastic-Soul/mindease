import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const PaginationControls = ({ currentPage, totalPages, setCurrentPage }) => {
    const getPageNumbers = () => {
        const delta = 2;
        const range = [];
        for (
            let i = Math.max(1, currentPage - delta);
            i <= Math.min(totalPages, currentPage + delta);
            i++
        ) {
            range.push(i);
        }
        return range;
    };

    return (
        <div className="flex justify-center items-center mt-6 gap-2">
            <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-full enabled:text-gray-700 hover:bg-gray-400 disabled:hover:bg-transparent disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
            >
                <ChevronLeftIcon className="w-5 h-5" />
            </button>

            {getPageNumbers()[0] > 1 && (
                <>
                    <button
                        onClick={() => setCurrentPage(1)}
                        className={`w-8 h-8 rounded-full border-2 ${currentPage === 1
                            ? "bg-blue-500 border-blue-600 text-white"
                            : "text-gray-700 border-gray-200 hover:bg-gray-100"
                            }`}
                    >
                        1
                    </button>
                    {getPageNumbers()[0] > 2 && <span className="px-2">...</span>}
                </>
            )}

            {getPageNumbers().map(pageNum => (
                <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-full border-2 ${currentPage === pageNum
                        ? "bg-blue-500 border-blue-600 text-white"
                        : "text-gray-700 border-gray-200 hover:bg-gray-100"
                        }`}
                >
                    {pageNum}
                </button>
            ))}

            {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
                <>
                    {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
                        <span className="px-2">...</span>
                    )}
                    <button
                        onClick={() => setCurrentPage(totalPages)}
                        className={`w-8 h-8 rounded-full border-2 ${currentPage === totalPages
                            ? "bg-blue-600 border-blue-800 text-white"
                            : "text-gray-700 border-gray-200 hover:bg-gray-100"
                            }`}
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full hover:bg-gray-400 disabled:hover:bg-transparent enabled:text-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
            >
                <ChevronRightIcon className="w-5 h-5" />
            </button>
        </div>
    );
};

export default PaginationControls;