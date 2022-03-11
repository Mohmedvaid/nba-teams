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
      <Table hover borderless responsive="md" className="table-main">
        <thead className="bg-theme">
          <tr>
            {currentData[0] &&
              columns.map((heading, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <th key={heading + index} className="p-3">
                  {columnTitles[heading] ? columnTitles[heading] : heading}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, rowIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={rowIndex} className="table-main-col">
              {columns.map((column, colIndex) => (
                // eslint-disable-next-line react/no-array-index-key
                <td key={`${rowIndex}-${colIndex}`} className="p-3">
                  {row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <Container className="d-flex justify-content-end">
        <BasicPagination
          prevPage={page === 0 ? null : true}
          nextPage={page === dataChunks.length - 1 ? null : true}
          currentPage={page + 1} // adding 1 as current page is 0 indexed
          handlePageChange={(newPage) => handlePageChange(newPage - 1)} // removing 1 as current page is 0 indexed
        />
      </Container>
    </Container>
  );
}

Datatable.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
};

export default Datatable;