import { useSelector } from "react-redux";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const AdminLayout = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const paths = [
    { title: "Dashboard", to: "/admin/dashboard" },
    { title: "Products", to: "/admin/products" },
    { title: "Users", to: "/admin/users" },
    { title: "Orders", to: "/admin/orders" },
  ];

  // Responsive check
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!userInfo || !userInfo.isAdmin) return <Navigate to="/auth/login" replace />;

  return (
    <>
      <Header />

      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          fontFamily: "'Poppins', sans-serif",
          backgroundColor: "#f4f5f7",
          color: "#2e2e2e",
          overflowX: "hidden",
        }}
      >
        {/* Sidebar only on desktop */}
        {isDesktop && (
          <div
            style={{
              width: sidebarExpanded ? 220 : 60,
              backgroundColor: "#fff",
              borderRight: "1px solid #e0e0e0",
              padding: sidebarExpanded ? "30px 15px" : "30px 8px",
              position: "sticky",
              top: 0,
              height: "100vh",
              boxShadow: "2px 0 5px rgba(0,0,0,0.05)",
              transition: "all 0.3s ease-in-out",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h5
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  color: "#2e2e2e",
                  marginBottom: "30px",
                  textAlign: sidebarExpanded ? "center" : "left",
                }}
              >
                {sidebarExpanded ? "Admin Panel" : "AP"}
              </h5>

              {paths.map((path) => (
                <NavLink
                  key={path.title}
                  to={path.to}
                  style={({ isActive }) => ({
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 12px",
                    marginBottom: "10px",
                    borderRadius: "6px",
                    textDecoration: "none",
                    color: isActive ? "#fff" : "#2e2e2e",
                    backgroundColor: isActive ? "#2e2e2e" : "transparent",
                    fontWeight: 500,
                    transition: "all 0.3s ease-in-out",
                    justifyContent: sidebarExpanded ? "flex-start" : "center",
                  })}
                >
                  <div style={{ width: 20, marginRight: sidebarExpanded ? 10 : 0 }} />
                  {sidebarExpanded && path.title}
                </NavLink>
              ))}
            </div>

            {/* Sidebar Toggle Arrow */}
            <div
              style={{
                cursor: "pointer",
                padding: "10px",
                textAlign: "center",
                borderTop: "1px solid #e0e0e0",
                marginTop: "auto",
              }}
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
            >
              {sidebarExpanded ? <FaChevronLeft /> : <FaChevronRight />}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div
          style={{
            flex: 1,
            padding: isDesktop ? "40px" : "20px 15px",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <Container fluid>
            <Outlet />
          </Container>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdminLayout;
