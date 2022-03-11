import React, { useState, useEffect } from "react";
import "./App.css";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import DropdownButton from "react-bootstrap/DropdownButton";
import Container from "react-bootstrap/Container";
import DataTable from "./Components/DataTable";
import {
  filterByValues,
  defaultFilterByText,
  filterByAll,
} from "./util/filters";
import Loader from "./Components/Loader";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [rawData, setRawData] = useState([]); // unmodified data from the API
  const [dataMain, setDataMain] = useState([]); // data after filtering, sorting etc for rendering
  const [filerBy, setFilerBy] = useState("Filter By"); // filterby ddl
  const [q, setQ] = useState(""); // search query
  const [isLoading, setIsLoading] = useState(true); // loading indicator

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://www.balldontlie.io/api/v1/teams`)
      .then((res) => res.json())
      .then((res) => {
        setRawData(res.data);
        setDataMain(res.data);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  // filter results by query and column name and set the dataMain state
  function search() {
    let results = [];
    // search through all columns if filter is "all"
    if (filerBy === defaultFilterByText || filerBy === filterByAll) {
      results = rawData.filter((row) =>
        Object.values(row).some((col) =>
          String(col).toLowerCase().includes(q.toLowerCase())
        )
      );
      // search only the selected column
    } else {
      results = rawData.filter((row) =>
        row[filerBy.toLowerCase()].toLowerCase().includes(q.toLowerCase())
      );
    }
    setDataMain(results);
  }

  // sort results by column name and set the dataMain state
  useEffect(() => search(), [q, filerBy]);

  return (
    <Container>
      <h1>NBA TEAMS</h1>
      <Container className="w-50 m-0">
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search"
            aria-label="Text input with dropdown button"
            onChange={(e) => setQ(e.target.value)}
          />
          <Dropdown>
            <DropdownButton
              variant="outline-secondary"
              title={filerBy}
              id="input-group-dropdown-2"
              align="end"
            >
              {filterByValues.map((val, idx) => (
                <Dropdown.Item
                  // eslint-disable-next-line react/no-array-index-key
                  key={val + idx}
                  onClick={() => {
                    setFilerBy(val);
                  }}
                >
                  {val}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Dropdown>
        </InputGroup>
      </Container>
      {isLoading ? <Loader /> : <DataTable data={dataMain} />}
    </Container>
  );
}

export default App;
