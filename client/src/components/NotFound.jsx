import { Link } from "react-router-dom";

const CartEmpty = () => {
  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Poppins', sans-serif",
    padding: "2rem",
    textAlign: "center",
  };

  const imageStyle = {
    maxWidth: "300px",
    marginBottom: "2rem",
  };

  const headingStyle = {
    fontSize: "1.8rem",
    fontWeight: "600",
    color: "#36454F",
    marginBottom: "0.5rem",
  };

  const subTextStyle = {
    fontSize: "1rem",
    color: "#6c757d",
    marginBottom: "1.5rem",
  };

  const buttonStyle = {
    backgroundColor: "#36454F",
    color: "#fff",
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    borderRadius: "50px",
    fontWeight: "500",
    textDecoration: "none",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transition: "0.3s ease",
  };

  return (
    <div style={containerStyle}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
        alt="Empty Cart"
        style={imageStyle}
      />
      <h2 style={headingStyle}>Your cart is currently empty</h2>
      <p style={subTextStyle}>Looks like you haven’t added anything to your cart yet.</p>
      <Link to="/" style={buttonStyle}>
        Start Shopping
      </Link>
    </div>
  );
};

export default CartEmpty;
