import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import DataTable from "./Components/DataTable";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`https://www.balldontlie.io/api/v1/teams`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        setLoading(false);
		console.log(data)
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1>Hello World!</h1>
      <DataTable data={data} />
    </div>
  );
}

export default App;
