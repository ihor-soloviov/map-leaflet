/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

export const Pagination = ({totalPages, currentPage, setCurrentPage }) => {

  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage === totalPages ? prevPage : prevPage + 1
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage === 1 ? prevPage : prevPage - 1));
  };


  return (
    <div className="pagination">
      <button
        className="pagination-button"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        Назад
      </button>

      <button
        className="pagination-button"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Вперед
      </button>
    </div>
  );
};
