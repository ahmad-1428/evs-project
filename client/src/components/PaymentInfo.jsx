import { useSelector } from "react-redux";

const PaymentInfo = () => {
  const { subTotal, shippingPrice, totalPrice } = useSelector((state) => state.cart);

  // Modern card container
  const cardStyle = {
    border: "none",
    borderRadius: "16px",
    padding: "2rem",
    backgroundColor: "#fff",
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
    fontFamily: "'Poppins', sans-serif",
  };

  const titleStyle = {
    fontSize: "1.3rem",
    fontWeight: 500,
    textTransform: "uppercase",
    marginBottom: "1.5rem",
    letterSpacing: "0.5px",
    color: "#111",
    textAlign: "center",
  };

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.8rem",
    color: "#333",
    fontSize: "0.95rem",
    fontWeight: 400,
  };

  const totalRowStyle = {
    ...rowStyle,
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "#000",
    marginTop: "1rem",
  };

  const dividerStyle = {
    borderTop: "1px solid #e5e5e5",
    margin: "1rem 0",
  };

  return (
    <div style={cardStyle}>
      <h6 style={titleStyle}>Order Summary</h6>

      <div style={rowStyle}>
        <span>Subtotal</span>
        <span>${subTotal.toFixed(2)}</span>
      </div>

      <div style={rowStyle}>
        <span>Shipping</span>
        <span>${shippingPrice.toFixed(2)}</span>
      </div>

      <div style={dividerStyle}></div>

      <div style={totalRowStyle}>
        <span>Total</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>

      <p
        style={{
          textAlign: "center",
          color: "#666",
          fontSize: "0.9rem",
          marginTop: "1.2rem",
        }}
      >
        Prices include all applicable taxes
      </p>
    </div>
  );
};

export default PaymentInfo;
