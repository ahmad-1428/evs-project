import Loader from "../components/Loader";
import AlertMessage from "../components/AlertMessage";
import apiClient from "../../services/api-client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Card } from "react-bootstrap";

const OrdersPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get(`/orders`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      })
      .then(({ data }) => setOrders(data))
      .catch((err) => {
        const msg = err.response?.data?.message || err.message;
        setError(msg);
      })
      .finally(() => setLoading(false));
  }, [userInfo]);

  return (
    <div
      className="py-5 px-2"
      style={{
        fontFamily: "Poppins, sans-serif",
        minHeight: "100vh",
        backgroundColor: "#fff",
      }}
    >
      <div className="container">
        <h3 className="fw-semibold mb-4">Your Orders</h3>

        {loading ? (
          <Loader />
        ) : error ? (
          <AlertMessage variant="danger">{error}</AlertMessage>
        ) : (
          <div className="d-flex flex-column gap-3">
            {orders.length === 0 ? (
              <p className="text-muted text-center">No orders found.</p>
            ) : (
              orders.map((order) => (
                <Card
                  key={order._id}
                  className="p-3 p-md-4 shadow-sm rounded-4 border bg-white"
                >
                  <Row className="align-items-center">
                    <Col xs={12} md={8} className="mb-2 mb-md-0">
                      <h6 className="mb-1 text-dark" style={{ fontSize: "0.95rem" }}>
                        Order #{order._id}
                      </h6>
                      <p className="text-muted mb-0 small" style={{ fontSize: "0.85rem" }}>
                        Placed on: {order.createdAt.substring(0, 10)}
                      </p>
                    </Col>

                    <Col xs={12} md={4} className="text-md-end">
                      <p className="fw-semibold mb-0 text-success" style={{ fontSize: "0.95rem" }}>
                        ${order.totalPrice.toFixed(2)}
                      </p>
                    </Col>
                  </Row>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
