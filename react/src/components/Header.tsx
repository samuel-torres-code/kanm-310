import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { LinkContainer } from "react-router-bootstrap";

import Logo from "../assets/logo.png";
import "./Header.css";
import useAdmin from "../hooks/useAdmin";
import LoginModal from "./LoginModal";

function Header() {


  const [isAdmin, setIsAdmin] = useAdmin();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [userID, setUserID] = useState<String>();

  const handleLogin = (username: string, password: string) => {
    console.log(username,password);
  };
  

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
              onChange={(e) => {
                const value = e.currentTarget.checked;
                setIsAdmin(value);
                localStorage.setItem("isAdmin", value.toString());
              }}
            >
              Admin
            </ToggleButton>
            <button onClick={() => setShowLoginModal(true)}>Login</button>
            <LoginModal
              show={showLoginModal}
              onHide={() => setShowLoginModal(false)}
              onLogin={handleLogin}
            />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
