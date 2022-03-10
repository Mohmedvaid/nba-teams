import React, { useState, useEffect } from "react";
import "./App.css";
import DataTable from "./Components/DataTable";
import Dropdown from "react-bootstrap/Dropdown";
import { filterByValues } from "./util/dataTable";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [rawData, setRawData] = useState([]);
  const [dataMain, setDataMain] = useState([]);
  const [filerBy, setFilerBy] = useState(filterByValues[0]);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetch(`https://www.balldontlie.io/api/v1/teams`)
      .then((res) => res.json())
      .then((res) => {
        setRawData(res.data);
        setDataMain(res.data);
      })
      .catch((err) => {});
  }, []);

  // filter results by query and column name and set the dataMain state
  function search(q) {
    let results = [];
    if (filerBy === "All") {
      results = rawData.filter((row) => Object.values(row).some((col) => String(col).toLowerCase().includes(q.toLowerCase())));
    } else {
      results = rawData.filter((row) => row[filerBy.toLowerCase()].toLowerCase().includes(q.toLowerCase()));
    }
    setDataMain(results);
  }

  function handleSearch() {
    search(q);
  }

  useEffect(() => {
    search(q);
  }, [q, filerBy]);

  return (
    <div className="App">
      <h1>NBA Teams</h1>
      <div>
        <input type="text" onChange={(e) => setQ(e.target.value)} />
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {filerBy}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {filterByValues.map((filterBy) => {
              return (
                <Dropdown.Item
                  key={filterBy}
                  onClick={() => {
                    setFilerBy(filterBy);
                  }}
                >
                  {filterBy}
                </Dropdown.Item>
              );
            })}
            <Dropdown.Item onClick={() => setFilerBy("Abbreviation")}>Abbreviation</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilerBy("City")}>City</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {dataMain.length === 0 ? <>Nothing here</> : <DataTable data={dataMain} />}
    </div>
  );
}

export default App;
