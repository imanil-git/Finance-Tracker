import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { GrLogin } from "react-icons/gr";
import { IoCreate } from "react-icons/io5";
import { RiDashboard3Fill } from "react-icons/ri";
import { TbTransactionDollar } from "react-icons/tb";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useUser } from "../../context/UserContext";
import { useState } from "react";
import { useThemeStore } from "../../store/useThemeStore";

export const Header = () => {
  const { theme, toggleTheme } = useThemeStore();
  const { user, setUser } = useUser();
  const [showMenu, setShowMenu] = useState(false);
  const handleOnLogOut = () => {
    //1. On Logout click delete `accessJWT` token from the `localStorage`
    localStorage.removeItem("accessJWT");
    //2. Reset user object from the this.state
    setUser({});
    setShowMenu(false);
  };

  return (
    <Navbar
      expand="lg"
      className={
        theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }
      expanded={showMenu}
    >
      <Container>
        <Navbar.Brand href="#home">Financial Tracker</Navbar.Brand>
        <div>Welcome {user?.name}</div>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setShowMenu(!showMenu)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user?._id ? (
              <>
                <Link
                  onClick={() => setShowMenu(false)}
                  className="nav-link"
                  to="/dashboard"
                >
                  <RiDashboard3Fill />
                  Dashboard
                </Link>
                <Link
                  onClick={() => setShowMenu(false)}
                  className="nav-link"
                  to="/transaction"
                >
                  <TbTransactionDollar />
                  Transaction
                </Link>
                <Link onClick={handleOnLogOut} className="nav-link" to="/">
                  <IoMdLogOut />
                  Logout
                </Link>
                <div
                  onClick={toggleTheme}
                  style={{
                    cursor: "pointer",
                    fontSize: "22px",
                    marginRight: "15px",
                    display: "flex",
                    alignItems: "center",
                    color: theme === "dark" ? "white" : "black",
                    transition: "0.3s",
                  }}
                >
                  {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
                </div>
              </>
            ) : (
              <>
                <Link
                  onClick={() => setShowMenu(false)}
                  className="nav-link"
                  to="/signup"
                >
                  <IoCreate />
                  Sign UP
                </Link>
                <Link
                  onClick={() => setShowMenu(false)}
                  className="nav-link"
                  to="/"
                >
                  <GrLogin />
                  Login
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
