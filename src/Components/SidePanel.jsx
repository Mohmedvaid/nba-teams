import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import CloseButton from "react-bootstrap/CloseButton";

function SidePanel() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setShow(!show)}>
        toggle nav
      </button>
      <Navbar expanded={show}>
        <Container fluid>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                More Info
              </Offcanvas.Title>
              <CloseButton onClick={() => setShow(false)} />
            </Offcanvas.Header>
            <Offcanvas.Body>
              <p>some text</p>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

export default SidePanel;
