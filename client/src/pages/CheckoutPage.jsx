import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import PaymentInfo from "../components/PaymentInfo";
import ShippingInfo from "../components/ShippingInfo";
import StripeContainer from "../components/StripeContainer";
import { useDispatch, useSelector } from "react-redux";
import { orderReset } from "../redux/orderSlice";
import axios from "axios";

const CheckoutPage = () => {
  const { success, orderId } = useSelector((state) => state.order);
  const { cartItems, shippingAddress } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (success) dispatch(orderReset());
    };
  }, [dispatch, success]);

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "/api/orders",
        {
          orderItems: cartItems.map((item) => ({
            name: item.title,
            image: item?.images?.[0] || item?.image || "/placeholder.png",
            qty: item.qty,
            price: item.price,
            productId: item.id,
          })),
          shippingAddress,
          shippingPrice: 0,
          subTotal: cartItems.reduce((acc, i) => acc + i.qty * i.price, 0),
          totalPrice: cartItems.reduce((acc, i) => acc + i.qty * i.price, 0),
          paymentMethod: {
            id: "pm_card_visa",
            card: "Visa",
            last4: "4242",
          },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("❌ Order failed:", err.response?.data || err.message);
    }
  };

  const cardStyle = {
    background: "#fff",
    borderRadius: "12px",
    padding: "2rem",
    boxShadow: "0 2px 15px rgba(0,0,0,0.06)",
  };

  return (
    <section
      style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#fff",
        minHeight: "100vh",
        padding: "2rem 1rem",
      }}
    >
      <Container fluid style={{ maxWidth: "1200px" }}>
        {success ? (
          <div
            className="mx-auto"
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "2rem 1.5rem",
              boxShadow: "0 2px 15px rgba(0,0,0,0.06)",
              maxWidth: "500px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "70px",
                height: "70px",
                border: "2px solid #000",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto 1rem",
              }}
            >
              <i className="fa fa-check" style={{ fontSize: "28px", color: "#000" }}></i>
            </div>
            <h3 style={{ fontWeight: 500, textTransform: "uppercase", marginBottom: "0.5rem" }}>
              Order Confirmed
            </h3>
            <p className="text-muted mb-3">
              Thank you for shopping with us! Your order has been successfully placed.
            </p>
            <Link
              to={`/orders/${orderId}`}
              className="btn btn-dark w-100"
              style={{
                padding: "0.8rem",
                textTransform: "uppercase",
                borderRadius: "6px",
                fontSize: "0.95rem",
              }}
            >
              View Order Details
            </Link>
          </div>
        ) : (
          <Row className="justify-content-center gy-4">
            <Col xs={12} sm={10} md={8} lg={7}>
              <div style={cardStyle}>
                <h4
                  style={{
                    textTransform: "uppercase",
                    fontWeight: 500,
                    marginBottom: "1.5rem",
                    borderBottom: "1px solid #eee",
                    paddingBottom: "0.8rem",
                  }}
                >
                  Checkout
                </h4>

                {/* Payment Info */}
                <PaymentInfo />

                {/* Shipping Info */}
                <div style={{ marginTop: "1.5rem" }}>
                  <ShippingInfo />
                </div>

                {/* Stripe Checkout */}
                <div style={{ marginTop: "1.5rem" }}>
                  <StripeContainer onPaymentSuccess={placeOrder} />
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
};

export default CheckoutPage;
