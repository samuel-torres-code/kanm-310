import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Logo from '../assets/logo.png'
import './Header.css'

function Header() {
    
  return (
    <div>
      <Navbar expand="lg">
        
        
        <Navbar.Brand className="mx-3">
            <img
              alt=""
              src={Logo}
              width="auto"
              height="30"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
        
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
