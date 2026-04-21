import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { GrLogin } from "react-icons/gr";
import { IoCreate } from "react-icons/io5";

export const Header = () => {
  return (
    <Navbar expand="lg" variant="dark" className="bg-body-dark">
      <Container>
        <Navbar.Brand href="#home">Financial Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link className="nav-link" href="/signup">
              <IoCreate />Sign UP
            </Link>
            <Link className="nav-link" href="/">
              <GrLogin />Login
            </Link>
            <Link className="nav-link" href="/">
              <IoMdLogOut />Logout
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
