import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  goToNextPage,
  goToPreviousPage,
}) => {
  return (
    <div className="flex justify-between mt-4">
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-md disabled:opacity-50"
      >
        Anterior
      </button>
      <span className="px-4 py-2">
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-md disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
