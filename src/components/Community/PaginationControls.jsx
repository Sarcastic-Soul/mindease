import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationControls = ({ currentPage, totalPages, setCurrentPage }) => {
    const getPageNumbers = () => {
        const delta = 1;
        let range = [];
        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            range.unshift("...");
        }
        if (currentPage + delta < totalPages - 1) {
            range.push("...");
        }

        range.unshift(1);
        if (totalPages > 1) {
            range.push(totalPages);
        }

        // Remove duplicates that might occur if totalPages is small
        return [...new Set(range)];
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center mt-8 gap-2">
            <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-white shadow-sm hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                aria-label="Previous page"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            {getPageNumbers().map((pageNum, index) => (
                 pageNum === "..." ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-gray-500">...</span>
                 ) : (
                    <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-lg shadow-sm font-semibold transition-colors ${
                            currentPage === pageNum
                                ? "bg-blue-600 text-white"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                        {pageNum}
                    </button>
                 )
            ))}

            <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-white shadow-sm hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                aria-label="Next page"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
};

export default PaginationControls;
