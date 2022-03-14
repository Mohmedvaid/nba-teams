import React, { useState, useEffect, useContext } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { ignoreFields, columnTitles } from "../util/dataTable";
import { paginationSize } from "../util/pagination";
import BasicPagination from "./BasicPagination";
import AlertMessage from "./AlertMessage";
import sidePanelContext from "../Context";

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
  // remove unwanted columns
  const columns =
    data[0] &&
    Object.keys(data[0]).filter((key) => !ignoreFields.includes(key));
  const dataChunks = splitDataInChunks(data, paginationSize);
  const [currentData, setCurrentData] = useState([]);
  const handlePageChange = (newPage) => {
    setCurrentData(dataChunks[newPage]);
    setPage(newPage);
  };
  const {
    isSidePanelOpen,
    setIsSidePanelOpen,
    sidePanelData,
    setSidePanelData,
  } = useContext(sidePanelContext);

  useEffect(() => {
    setCurrentData(dataChunks[page]);
    setPage(0);
  }, [data]);

  // get teams data from API and set it to the seidepanel data
  const getTeamsData = async (teamID) => {
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/games?team_ids[]=${teamID}`
    );
    const { data: teamData } = await response.json();
    console.log(teamData);
    return teamData;
  };

  const displayTeamDetails = async (team) => {
    const teamData = await getTeamsData(team.id);
    setIsSidePanelOpen(true);
    setSidePanelData({
      id: team.id,
      full_name: team.full_name,
      name: team.name,
      abbreviation: team.abbreviation,
      city: team.city,
      conference: team.conference,
      division: team.division,
      teamData,
    });
  };

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
            <tr
              // eslint-disable-next-line react/no-array-index-key
              key={rowIndex}
              className={`${
                sidePanelData.id === row.id && isSidePanelOpen ? "selected" : ""
              } table-main-col`}
              onClick={() => displayTeamDetails(row)}
            >
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
