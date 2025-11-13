import {
  Navbar,
  Container,
  Offcanvas,
  Nav,
  Badge,
  NavDropdown,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, Package, Menu, User } from "lucide-react"; // only Lucide
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { removeUserInfo } from "../redux/authSlice";
import { useEffect, useState } from "react";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);

  const messages = [
    "🎉 FREE SHIPPING ON ALL ORDERS OVER $50!",
    "🔥 TODAY ONLY: GET 50% OFF SELECTED ITEMS!",
    "🛍️ NEW ARRIVALS JUST LANDED – CHECK THEM OUT NOW!",
    "💳 SECURE CHECKOUT & MULTIPLE PAYMENT OPTIONS.",
    "🚚 FAST DELIVERY GUARANTEED WITHIN 2-3 DAYS!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const onLogout = () => {
    dispatch(removeUserInfo());
    toast.success("LOGOUT SUCCESSFULLY");
    navigate("/auth/login");
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <div className="announcement-message fade-animation">
          {messages[currentIndex]}
        </div>
      </div>

      {/* Navbar */}
      <Navbar expand="lg" className="shadow-sm bg-white py-3 sticky-top">
        <Container className="d-flex justify-content-between">
          {/* Logo */}
          <Navbar.Brand
            as={NavLink}
            to="/"
            className="fw-bold fs-3"
            style={{ fontFamily: "Poppins", color: "#000" }}
          >
            SwiftCart
          </Navbar.Brand>

          {/* Right Icons */}
          <div className="d-flex align-items-center gap-3">
            {/* Cart */}
            <NavLink to="/cart" className="position-relative nav-icon">
              <ShoppingCart size={22} strokeWidth={1.5} />
              {cartItems.length > 0 && (
                <Badge
                  pill
                  bg="dark"
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: "0.65rem" }}
                >
                  {cartItems.length}
                </Badge>
              )}
            </NavLink>

            {/* Orders */}
            <NavLink to="/orders" className="nav-icon">
              <Package size={22} strokeWidth={1.5} />
            </NavLink>

            {/* User Dropdown */}
            {userInfo ? (
              <NavDropdown
                title={<User size={22} strokeWidth={1.5} />}
                id="user-dropdown"
                align="end"
                className="user-dropdown"
              >
                <NavDropdown.Item as={NavLink} to="/profile">
                  Profile
                </NavDropdown.Item>

                {userInfo.isAdmin && (
                  <NavDropdown.Item as={NavLink} to="/admin/dashboard">
                    Dashboard (Admin)
                  </NavDropdown.Item>
                )}

                <NavDropdown.Divider />

                <NavDropdown.Item onClick={onLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavLink to="/auth/login" className="nav-icon">
                <User size={22} strokeWidth={1.5} />
              </NavLink>
            )}

            {/* Hamburger */}
            <span
              className="d-lg-none nav-icon"
              style={{ cursor: "pointer" }}
              onClick={() => setShowSidebar(true)}
            >
              <Menu size={26} strokeWidth={1.5} />
            </span>
          </div>
        </Container>
      </Navbar>

      {/* Sidebar */}
      <Offcanvas
        show={showSidebar}
        onHide={() => setShowSidebar(false)}
        placement="end"
        style={{
          backgroundColor: "#fff",
          color: "#000",
          fontFamily: "Poppins",
          textTransform: "uppercase",
        }}
      >
        <Offcanvas.Header closeButton closeVariant="black">
          <Offcanvas.Title className="fw-bold fs-4">
            MENU
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column gap-3 fs-6 fw-medium">
            <Nav.Link as={NavLink} to="/" onClick={() => setShowSidebar(false)}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/cart" onClick={() => setShowSidebar(false)}>
              Cart
            </Nav.Link>
            <Nav.Link as={NavLink} to="/orders" onClick={() => setShowSidebar(false)}>
              Orders
            </Nav.Link>
            {userInfo ? (
              <>
                <Nav.Link as={NavLink} to="/profile" onClick={() => setShowSidebar(false)}>
                  Profile
                </Nav.Link>
                {userInfo.isAdmin && (
                  <Nav.Link
                    as={NavLink}
                    to="/admin/dashboard"
                    onClick={() => setShowSidebar(false)}
                  >
                    Dashboard
                  </Nav.Link>
                )}
                <Nav.Link onClick={onLogout}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link as={NavLink} to="/auth/login" onClick={() => setShowSidebar(false)}>
                Login
              </Nav.Link>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Styling */}
      <style>{`
        .announcement-bar {
          background-color: #2E2E2E;
          color: #FFFFFF;
          text-align: center;
          font-family: 'Poppins', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          padding: 8px 0;
          letter-spacing: 1px;
        }

        .fade-animation {
          animation: fadeInOut 4s ease-in-out infinite;
        }

        @keyframes fadeInOut {
          0% { opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }

        .nav-icon {
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-icon:hover {
          color: #555;
        }

        /* Dropdown Styling */
        .user-dropdown .dropdown-toggle {
          background: none !important;
          border: none !important;
          color: #000 !important;
          padding: 0;
          display: flex;
          align-items: center;
          
        }

        .user-dropdown .dropdown-menu {
          border-radius: 0;
          border: 1px solid #eee;
          font-family: 'Poppins', sans-serif;
          text-transform: uppercase;
        }

        .user-dropdown .dropdown-item {
          font-weight: 500;
          letter-spacing: 0.5px;
          padding: 0.6rem 1rem;
        }

        .user-dropdown .dropdown-item:hover {
          background-color: #000 !important;
          color: #fff !important;
        }

        .offcanvas .nav-link {
          color: #000;
          font-weight: 500;
          letter-spacing: 1px;
        }

        .offcanvas .nav-link:hover {
          color: #2E2E2E;
        }
      `}</style>
    </>
  );
};

export default Header;
