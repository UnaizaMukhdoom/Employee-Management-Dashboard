function buildPageNumbers(totalPages) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
}

function PageButton({ pageNumber, currentPage, onClick }) {
  const isCurrentPage = pageNumber === currentPage;

  let buttonStyle;
  if (isCurrentPage) {
    buttonStyle = "bg-blue-600 text-white";
  } else {
    buttonStyle = "border border-gray-300 hover:bg-gray-50";
  }

  return (
    <button
      onClick={onClick}
      className={`w-8 h-8 rounded-md text-sm ${buttonStyle}`}
    >
      {pageNumber}
    </button>
  );
}

function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = buildPageNumbers(totalPages);
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  return (
    <div className="flex items-center gap-2 mt-4">
      <button
        disabled={isFirstPage}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1.5 border border-gray-300 rounded-md text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        Prev
      </button>

      {pageNumbers.map((pageNumber) => (
        <PageButton
          key={pageNumber}
          pageNumber={pageNumber}
          currentPage={page}
          onClick={() => onPageChange(pageNumber)}
        />
      ))}

      <button
        disabled={isLastPage}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1.5 border border-gray-300 rounded-md text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;