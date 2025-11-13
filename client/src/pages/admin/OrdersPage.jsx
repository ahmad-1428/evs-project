import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Badge, Row, Col, Container } from "react-bootstrap";
import apiClient from "../../../services/api-client";
import Loader from "../../components/Loader";
import AlertMessage from "../../components/AlertMessage";
import { FaTimes, FaCheck } from "react-icons/fa";

const OrdersPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);

  const { userInfo } = useSelector((state) => state.auth);

  const charcoal = "#2e2e2e"; // Charcoal Grey
  const poppins = "'Poppins', sans-serif"; // Font

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { data } = await apiClient.get(`/admin/orders`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        setOrders(data);
      } catch (err) {
        const message =
          err.response?.data?.message || err.message || "Failed to load orders";
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userInfo]);

  const renderPaymentStatus = (isPaid) => {
    return isPaid ? (
      <Badge bg="success" className="px-4 py-2 rounded-pill">
        <FaCheck className="me-2" />
        Payment Success
      </Badge>
    ) : (
      <Badge bg="danger" className="px-4 py-2 rounded-pill">
        <FaTimes className="me-2" />
        Payment Failed
      </Badge>
    );
  };

  if (loading) return <Loader />;
  if (error) return <AlertMessage variant="danger">{error}</AlertMessage>;

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="align-items-center mb-4">
        <Col>
          <h2
            className="text-dark"
            style={{ fontFamily: poppins, fontWeight: 700, color: charcoal }}
          >
            Orders Management
          </h2>
          <p className="text-muted" style={{ fontFamily: poppins }}>
            View and manage all orders placed by customers.
          </p>
        </Col>
      </Row>

      {/* Orders Table */}
      <div className="bg-white rounded shadow-sm p-3">
        <div className="table-responsive">
          <Table
            hover
            className="align-middle mb-0"
            style={{ fontFamily: poppins, color: charcoal }}
          >
            <thead style={{ backgroundColor: "#f4f4f4" }}>
              <tr style={{ color: charcoal }}>
                <th>Order Id</th>
                {/* <th className="text-center">Ordered By</th> */}
                <th className="text-center">Date of Order</th>
                <th className="text-center">Total Price</th>
                <th className="text-center">Order Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td className="d-flex align-items-center">
                      <span className="ms-3" style={{ color: charcoal }}>
                        #{order._id}
                      </span>
                    </td>
                    {/* Safely access user name */}
                    {/* <td className="text-center">{order.user?.name || ""}</td> */}
                    <td className="text-center">
                      {order.createdAt?.substring(0, 10) || "N/A"}
                    </td>
                    <td className="text-center">
                      ${order.totalPrice?.toFixed(2) || "0.00"}
                    </td>
                    <td className="text-center">{renderPaymentStatus(order.isPaid)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default OrdersPage;
