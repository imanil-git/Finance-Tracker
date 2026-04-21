import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <Navbar expand="lg" variant="dark" className="bg-body-dark">
      <Container>
        <Navbar.Brand href="#home">Financial Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link className="nav-link" href="/signup">
              Sign UP
            </Link>
            <Link className="nav-link" href="/">
              Login
            </Link>
            <Link className="nav-link" href="/">
              Logout
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
