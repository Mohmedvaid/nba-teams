import React from "react";
import PropTypes from "prop-types";
import Pagination from "react-bootstrap/Pagination";

function BasicPagination({
  prevPage,
  nextPage,
  currentPage,
  handlePageChange,
}) {
  const enablePrev = !prevPage;
  const enableNext = !nextPage;
  return (
    <Pagination>
      <Pagination.Prev
        disabled={enablePrev}
        onClick={() => handlePageChange(currentPage - 1)}
      />

      <Pagination.Item disabled>{currentPage}</Pagination.Item>

      <Pagination.Next
        disabled={enableNext}
        onClick={() => handlePageChange(currentPage + 1)}
      />
    </Pagination>
  );
}

BasicPagination.defaultProps = {
  prevPage: false,
  nextPage: false,
};

BasicPagination.propTypes = {
  prevPage: PropTypes.bool,
  nextPage: PropTypes.bool,
  currentPage: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default BasicPagination;
