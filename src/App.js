import React, { useState, useEffect } from "react";
import "./App.css";
import DataTable from "./Components/DataTable";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");
  const [filerBy, setFilerBy] = useState("Abbreviation");

  useEffect(() => {
    fetch(`https://www.balldontlie.io/api/v1/teams`)
      .then((res) => res.json())
      .then((res) => setData(res.data))
      .catch((err) => {});
  }, []);

  function search() {
    return data.filter((row) => Object.values(row).some((col) => String(col).toLowerCase().includes(q.toLowerCase())));
  }

  return (
    <div className="App">
      <h1>NBA Teams</h1>
      <div>
        <input type="text" value={q} onChange={(e) => setQ(e.target.value)} />
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {filerBy}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setFilerBy("Abbreviation")}>Abbreviation</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilerBy("City")}>City</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {data.length === 0 ? <>Nothing here</> : <DataTable data={search()} />}
    </div>
  );
}

export default App;
