import React from "react"; 

// Pagination component for navigating between pages
const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    // Pagination controls container
    <div className="flex justify-between items-center mt-4 mb-2">
      {/* Previous page button */}
      <button
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
      >
        Previous
      </button>
      {/* Current page indicator */}
      <span>
        Page {currentPage} of {totalPages}
      </span>
      {/* Next page button */}
      <button
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;