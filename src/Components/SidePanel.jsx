import React, { useState, useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Offcanvas from "react-bootstrap/Offcanvas";
import CloseButton from "react-bootstrap/CloseButton";
import sidePanelContext from "../Context";

function SidePanel() {
  const { isSidePanelOpen, setIsSidePanelOpen, sidePanelData } =
    useContext(sidePanelContext);
  return (
    <div>
      <Navbar expanded={isSidePanelOpen}>
        <Container fluid>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                {sidePanelData.name}
              </Offcanvas.Title>
              <CloseButton onClick={() => setIsSidePanelOpen(false)} />
            </Offcanvas.Header>
            <Offcanvas.Body>
              {sidePanelData.teamData.length > 0 ? (
                <>
                  <Container>
                    <Row>
                      <Col>Team Full Name:</Col>
                      <Col>{sidePanelData.full_name}</Col>
                    </Row>
                    <Row>
                      <Col>Total Games:</Col>
                      <Col>{sidePanelData.teamData.length}</Col>
                    </Row>
                  </Container>
                  <Container>
                    <Row>
                      <Col>Date:</Col>
                      <Col>
                        {new Date(sidePanelData.teamData[0].date).toString()}
                      </Col>
                    </Row>
                    <Row>
                      <Col>Home Team:</Col>
                      <Col>{sidePanelData.teamData[0].home_team_name}</Col>
                    </Row>
                    <Row>
                      <Col>Home Team Score:</Col>
                      <Col>{sidePanelData.teamData[0].home_team_score}</Col>
                    </Row>
                    <Row>
                      <Col>Visitor Team:</Col>
                      <Col>{sidePanelData.teamData[0].visitor_team_name}</Col>
                    </Row>
                    <Row>
                      <Col> Visitor Team Score:</Col>
                      <Col>{sidePanelData.teamData[0].visitor_team_score}</Col>
                    </Row>
                  </Container>
                </>
              ) : (
                "Nothing here"
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

export default SidePanel;
