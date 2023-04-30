import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { LinkContainer } from "react-router-bootstrap";

import Logo from "../assets/logo.png";
import "./Header.css";

function Header() {
  const [isAdmin, setIsAdmin] = useState<Boolean>(false);

  return (
    <div>
      <Navbar expand="lg">
        <Navbar.Brand className="mx-3">
          <a href="/">
            <img
              alt=""
              src={Logo}
              width="auto"
              height="30"
              className="d-inline-block align-top"
            />{" "}
          </a>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            {isAdmin && (
              <>
                <LinkContainer to="/users">
                  <Nav.Link>User Manager</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/schedule">
                  <Nav.Link>Show Schedule</Nav.Link>
                </LinkContainer>
              </>
            )}
            {!isAdmin && (
              <>
                <LinkContainer to="/users">
                  <Nav.Link>My Profile</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/shows/2">
                  <Nav.Link>My Show</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/userschedule">
                  <Nav.Link>Show Schedule</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
          <Nav className="ml-auto mr-2">
            <ToggleButton
              className="mb-2"
              id="toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={isAdmin}
              value="1"
              onChange={(e) => setIsAdmin(e.currentTarget.checked)}
            >
              Admin
            </ToggleButton>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
