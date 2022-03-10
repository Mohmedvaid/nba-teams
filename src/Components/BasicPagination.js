// TODO
import React from "react";
import Pagination from "react-bootstrap/Pagination";

function BasicPagination({ prevPage, nextPage, currentPage, handlePageChange }) {
  const enablePrev = prevPage ? false : true;
  const enableNext = nextPage ? false : true;
  return (
    <Pagination>
      <Pagination.Prev disabled={enablePrev} onClick={() => handlePageChange(currentPage - 1)} />

      <Pagination.Item disabled>{currentPage}</Pagination.Item>

      <Pagination.Next disabled={enableNext} onClick={() => handlePageChange(currentPage + 1)} />
    </Pagination>
  );
}

export default BasicPagination;
