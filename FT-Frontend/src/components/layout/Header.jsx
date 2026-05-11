import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { GrLogin } from "react-icons/gr";
import { IoCreate } from "react-icons/io5";
import { RiDashboard3Fill } from "react-icons/ri";
import { TbTransactionDollar } from "react-icons/tb";
import { useUser } from "../../context/UserContext";

export const Header = () => {
  const { setUser } = useUser;
  const handleOnLogOut = () => {
    //1. On Logout click delete `accessJWT` token from the `localStorage`
    localStorage.removeItem("accessJWT");
    //2. Reset user object from the this.state
    setUser({});
  };

  return (
    <Navbar expand="lg" variant="dark" className="bg-body-dark">
      <Container>
        <Navbar.Brand href="#home">Financial Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link className="nav-link" to="/signup">
              <IoCreate />
              Sign UP
            </Link>
            <Link className="nav-link" to="/">
              <GrLogin />
              Login
            </Link>
            <Link className="nav-link" to="/dashboard">
              <RiDashboard3Fill />
              Dashboard
            </Link>
            <Link className="nav-link" to="/transaction">
              <TbTransactionDollar />
              Transaction
            </Link>
            <Link onClick={handleOnLogOut} className="nav-link" to="/">
              <IoMdLogOut />
              Logout
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
