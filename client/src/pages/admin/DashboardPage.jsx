import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Package, Users, ShoppingCart } from "lucide-react";
import apiClient from "../../../services/api-client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardPage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [counts, setCounts] = useState({ products: 0, users: 0, orders: 0 });
  const [revenueData, setRevenueData] = useState([
    { name: "Jan", revenue: 800000 },
    { name: "Feb", revenue: 960000 },
    { name: "Mar", revenue: 850000 },
    { name: "Apr", revenue: 920000 },
    { name: "May", revenue: 1100000 },
    { name: "Jun", revenue: 970000 },
    { name: "Jul", revenue: 1200000 },
  ]);

  // Fetch dynamic counts
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [productsRes, usersRes, ordersRes] = await Promise.all([
          apiClient.get("/admin/products", { headers: { Authorization: `Bearer ${userInfo.token}` } }),
          apiClient.get("/admin/users", { headers: { Authorization: `Bearer ${userInfo.token}` } }),
          apiClient.get("/admin/orders", { headers: { Authorization: `Bearer ${userInfo.token}` } }),
        ]);

        setCounts({
          products: Array.isArray(productsRes.data) ? productsRes.data.length : 0,
          users: Array.isArray(usersRes.data) ? usersRes.data.length : 0,
          orders: Array.isArray(ordersRes.data) ? ordersRes.data.length : 0,
        });
      } catch (err) {
        console.error("Error fetching counts:", err);
      }
    };

    fetchCounts();
  }, [userInfo]);

  return (
    <div
      className="container py-5"
      style={{
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#ffffff",
        color: "#2e2e2e",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* === Top Stat Cards === */}
      <Row className="mb-4 text-center">
        <Col md={4} className="mb-3">
          <NavLink to="/admin/products" className="text-decoration-none text-dark">
            <Card className="shadow-sm border-0 p-3" style={{ backgroundColor: "#ffffff", borderRadius: "12px" }}>
              <Card.Body className="d-flex flex-column align-items-center">
                <h6 className="fw-semibold text-uppercase text-muted mb-2">Total Products</h6>
                <Package size={50} strokeWidth={1.5} />
                <span className="mt-2 fw-bold">{counts.products}</span>
              </Card.Body>
            </Card>
          </NavLink>
        </Col>

        <Col md={4} className="mb-3">
          <NavLink to="/admin/users" className="text-decoration-none text-dark">
            <Card className="shadow-sm border-0 p-3" style={{ backgroundColor: "#ffffff", borderRadius: "12px" }}>
              <Card.Body className="d-flex flex-column align-items-center">
                <h6 className="fw-semibold text-uppercase text-muted mb-2">Total Users</h6>
                <Users size={50} strokeWidth={1.5} />
                <span className="mt-2 fw-bold">{counts.users}</span>
              </Card.Body>
            </Card>
          </NavLink>
        </Col>

        <Col md={4} className="mb-3">
          <NavLink to="/admin/orders" className="text-decoration-none text-dark">
            <Card className="shadow-sm border-0 p-3" style={{ backgroundColor: "#ffffff", borderRadius: "12px" }}>
              <Card.Body className="d-flex flex-column align-items-center">
                <h6 className="fw-semibold text-uppercase text-muted mb-2">Total Orders</h6>
                <ShoppingCart size={50} strokeWidth={1.5} />
                <span className="mt-2 fw-bold">{counts.orders}</span>
              </Card.Body>
            </Card>
          </NavLink>
        </Col>
      </Row>

      {/* === Market Overview Graph === */}
      <Row>
        <Col md={12}>
          <Card className="border-0 p-4" style={{ backgroundColor: "#ffffff", borderRadius: "12px" }}>
            <Card.Body>
              <h4 className="fw-semibold mb-1">Market Overview</h4>
              <p className="text-secondary mb-4">
                Real-time revenue growth data for the last 7 months.
              </p>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="name" stroke="#333" />
                  <YAxis stroke="#333" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      color: "#000",
                    }}
                    labelStyle={{ color: "#000" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#00aaff"
                    strokeWidth={3}
                    dot={{ r: 4, stroke: "#333", strokeWidth: 1 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
