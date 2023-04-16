import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Logo from '../assets/logo.png'

function Header() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        
        <LinkContainer to="/">
        <Navbar.Brand href="#home">
            <img
              alt=""
              src={Logo}
              width="auto"
              height="30"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/users">
              <Nav.Link>User Manager</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/schedule">
              <Nav.Link>Show Schedule</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
