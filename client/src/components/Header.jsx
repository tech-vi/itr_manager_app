import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Image,
  Offcanvas,
} from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "/vi-logo.png";
import avatar from "/avatar.png";
import { HiMenu } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/features/authSlice.js";
import { useLogoutUserMutation } from "../api/slices/userAPI.js";
import { useState } from "react";

const Header = () => {
  const expand = "md";
  const { user } = useSelector((state) => state.auth);
  const greet = `Hello ${user?.fname}`;
  const [logoutUser] = useLogoutUserMutation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/login", { replace: true });
    } catch (error) {
      // console.log("Error during logout :", error);
    }
  };

  return (
    <>
      <Navbar expand={expand} style={{ backgroundColor: "#e9ecef" }}>
        <Container>
          <Link to={"/"}>
            <Image className="brand" src={logo} rounded alt="VI" />
          </Link>
          <Navbar.Offcanvas
            // style={{ backgroundColor: "rgba(0,0,0,0.7)", color: "#fff" }}
            show={show}
            onHide={handleClose}
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Virtual India
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link as={NavLink} to={"/dashboard"} onClick={handleClose}>
                  Dashboard
                </Nav.Link>
                <Nav.Link as={NavLink} to={"/clients"} onClick={handleClose}>
                  Clients
                </Nav.Link>
                <NavDropdown
                  // style={{ backgroundColor: "transparent", color: "#fff" }}
                  title="More"
                  id="basic-nav-dropdown"
                  className={user.isAdmin ? "d-block" : "d-none"}
                >
                  <NavDropdown.Item
                    as={NavLink}
                    to={"/users"}
                    onClick={handleClose}
                  >
                    Users
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as={NavLink}
                    to={"/financial_years"}
                    onClick={handleClose}
                  >
                    Financial Years
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={NavLink}
                    to={"/itr_form_types"}
                    onClick={handleClose}
                  >
                    ITR Form Types
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={NavLink}
                    to={"/itr_form_statuses"}
                    onClick={handleClose}
                  >
                    ITR Form Statuses
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={NavLink}
                    to={"/fee_statuses"}
                    onClick={handleClose}
                  >
                    Fee Statuses
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <div className="d-flex justify-content-start align-items-center gap-2 user-menu">
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${expand}`}
              className="border border-0 p-0"
              onClick={handleShow}
            >
              <HiMenu size={30} />
            </Navbar.Toggle>

            <NavDropdown
              title={
                <Image
                  className="avatar"
                  roundedCircle
                  alt="Avatar"
                  src={avatar}
                />
              }
              align={"end"}
              id="collapsible-nav-dropdown"
            >
              {/* <NavDropdown.Item as={Link} to="/profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/settings">
                Settings
              </NavDropdown.Item> */}
              <NavDropdown.Item>{greet}</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={"button"} onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
