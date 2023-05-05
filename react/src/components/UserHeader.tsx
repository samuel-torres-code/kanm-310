import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Logo from '../assets/logo.png'
import './Header.css'

/*
  Author: Liam Ramsey
  Description: Modified header to display user views (Depricated)
*/
function UserHeader() {

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
            />{' '}
          </a>
          </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/users">
              <Nav.Link>My Profile</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/shows/1">
              <Nav.Link>My Show</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/userschedule">
              <Nav.Link>Show Schedule</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default UserHeader;
