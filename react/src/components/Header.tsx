import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { LinkContainer } from "react-router-bootstrap";

import Logo from "../assets/logo.png";
import "./Header.css";
import useAdmin from "../hooks/useAdmin";
import useLocalStorageUserID from "../hooks/useLocalStorageUserID";
import useLocalStorageShowID from "../hooks/useLocalStorageShowID";
import LoginModal from "./LoginModal";
import useShowAdminToggle from "../hooks/useShowAdminToggle";

function Header() {

  const [showAdminToggle, setShowAdminToggle] = useShowAdminToggle();
  const [isAdmin, setIsAdmin] = useAdmin();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [userID, setUserID] = useLocalStorageUserID();
  const [showID, setShowID] = useLocalStorageShowID();

  const handleLogin = (username: string, password: string) => {
    fetch(
      `http://localhost/kanm-310/react/php/getUsers.php?function=getUserData&username=${username}&password=${password}`
    )
      .then((response) => response.json())
      .then((data) => {
        setUserID(data.user_id);
        setShowAdminToggle(data.is_admin === "1");
        if(data.is_dj === "1") {
          fetch(`http://localhost/kanm-310/react/php/getShows.php?function=getShowDataFromUser&id=${data.user_id}`).then((res) => res.json()).then((data)=> {
            console.log(data);
            setShowID(data.show_id);
            window.location.reload();
          })
        }
        else {
          setShowID(undefined);
          window.location.reload();
        }
        
        

      });
  };

  

  return (
    <div style={{marginRight: "20px", marginTop: "10px"}}>
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
                <LinkContainer to="/users">
                  <Nav.Link>User Manager</Nav.Link>
                </LinkContainer>
                )}
                {showID && 
                <LinkContainer to="/profile">
                  <Nav.Link>My Profile</Nav.Link>
                </LinkContainer>
}
                {showID && 
                <LinkContainer to={`/shows/${showID}`}>
                  <Nav.Link>My Show</Nav.Link>
                </LinkContainer>
                }
                <LinkContainer to="/schedule">
                  <Nav.Link>Show Schedule</Nav.Link>
                </LinkContainer>
              
            
            
                
                
              
          </Nav>
          <Nav className="ml-auto mr-2">
            {showAdminToggle &&
            <div className="pe-2">
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
                  window.location.reload()
                }}
              >
                Admin
              </ToggleButton>
            </div>
}
            {!userID && <>
            <Button className="mb-2" onClick={() => setShowLoginModal(true)}>Login</Button>
            
            </>
  }
  {userID && <><Button variant="secondary" className="mb-2" onClick={() => {setUserID(undefined); setShowAdminToggle(false); setIsAdmin(false); setShowID(undefined);window.location.reload();}}>Logout</Button></>}
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
