import React from "react";
import Placeholder from "react-bootstrap/Placeholder";

function Loader() {
  return (
    <>
      <p aria-hidden="true">
        <Placeholder xs={6} />
      </p>

      <Placeholder.Button xs={4} aria-hidden="true" />
    </>
  );
}

export default Loader;
