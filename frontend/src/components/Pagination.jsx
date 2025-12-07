import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 6;
  const pages = Math.min(totalPages, maxVisiblePages);

  return (
    <div className="flex items-center justify-center gap-2 py-4 bg-white">
      {[...Array(pages)].map((_, i) => {
        const pageNum = i + 1;
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`w-8 h-8 rounded border text-sm font-medium transition-colors ${
              currentPage === pageNum
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-700 border-[#E5E7EB] hover:bg-gray-50'
            }`}
          >
            {pageNum}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
