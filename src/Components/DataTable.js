import React from "react";

function Datatable({ data }) {
  const columns = data[0] && Object.keys(data[0]);
  console.log(data);
  return (
    <>
      <div>Datatable</div>
      {/* basic table layout */}
      <table className="table" cellPadding={0} cellSpacing={0}>
        <thead>
          <tr>{data[0] && columns.map((heading) => <th>{heading}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr>
              {columns.map((column) => (
                <td>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Datatable;