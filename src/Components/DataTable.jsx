import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { ignoreFields, columnTitles } from "../util/dataTable";
import { paginationSize } from "../util/pagination";
import BasicPagination from "./BasicPagination";
import AlertMessage from "./AlertMessage";

// create chunks for pagination
function splitDataInChunks(data, chunkSize) {
  if (data.length === 0) return [];
  const chunks = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    chunks.push(data.slice(i, i + chunkSize));
  }
  return chunks;
}

function Datatable({ data }) {
  const [page, setPage] = useState(0);
  const columns =
    data[0] &&
    Object.keys(data[0]).filter((key) => !ignoreFields.includes(key));
  const dataChunks = splitDataInChunks(data, paginationSize);
  const [currentData, setCurrentData] = useState([]);
  const handlePageChange = (newPage) => {
    setPage(newPage);
    setCurrentData(dataChunks[page]);
  };

  useEffect(() => {
    setCurrentData(dataChunks[page]);
    setPage(0);
  }, [data]);

  if (!currentData || data.length === 0) {
    return (
      <AlertMessage
        variant="warning"
        message="Looks like there are no more results!"
      />
    );
  }
  return (
    <Container>
      {/* basic table layout */}
      <Table striped bordered hover responsive="md">
        <thead>
          <tr>
            {currentData[0] &&
              columns.map((heading, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <th key={heading + index}>
                  {columnTitles[heading] ? columnTitles[heading] : heading}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, rowIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                // eslint-disable-next-line react/no-array-index-key
                <td key={`${rowIndex}-${colIndex}`}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <BasicPagination
        prevPage={page === 0 ? null : true}
        nextPage={page === dataChunks.length - 1 ? null : true}
        currentPage={page}
        handlePageChange={(newPage) => handlePageChange(newPage)}
      />
    </Container>
  );
}

Datatable.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
};

export default Datatable;
