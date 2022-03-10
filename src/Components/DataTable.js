import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { ignoreFields, columnTitles } from "../util/dataTable";
import { paginationSize } from "../util/pagination";
import BasicPagination from "./BasicPagination";

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
  const columns = data[0] && Object.keys(data[0]).filter((key) => !ignoreFields.includes(key));
  const dataChunks = splitDataInChunks(data, paginationSize);
  const [currentData, setCurrentData] = useState(dataChunks[0]);
console.log(page, dataChunks.length);
  const handlePageChange = (page) => {
    setPage(page);
    setCurrentData(dataChunks[page]);
  };
  if (!currentData) return <div>Nothing here!</div>;
  return (
    <Container>
      <div>Datatable</div>
      {/* basic table layout */}
      <Table striped bordered hover responsive="md">
        <thead>
          <tr>
            {currentData[0] &&
              columns.map((heading, index) => <th key={heading + index}>{columnTitles[heading] ? columnTitles[heading] : heading}</th>)}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={`${rowIndex}-${colIndex}`}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <BasicPagination
        prevPage={page === 0 ? null : true}
        nextPage={page === dataChunks.length-1 ? null : true}
        currentPage={page}
        handlePageChange={(page) => handlePageChange(page)}
      />
    </Container>
  );
}

export default Datatable;
