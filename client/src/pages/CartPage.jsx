import { useSelector, useDispatch } from "react-redux";
import { Button, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { removeFromCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import NotFound from "../components/NotFound";

const CartPage = () => {
  const { cartItems, shippingPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeItem = (productId) => {
    dispatch(removeFromCart(productId));
    toast.info("Removed from cart");
  };

  const roundNumbers = (val) => +Math.round(val).toFixed(2);
  const subTotal = roundNumbers(
    cartItems.reduce((prev, curr) => prev + curr.price * curr.qty, 0)
  );
  const total = subTotal + shippingPrice;

  return (
    <section
      style={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        fontFamily: "Poppins, sans-serif",
        padding: "3rem 0",
        color: "#000",
      }}
    >
      {cartItems.length === 0 ? (
        <NotFound />
      ) : (
        <Container>
          <h2
            style={{
              fontWeight: 400,
              textTransform: "uppercase",
              letterSpacing: "1px",
              borderBottom: "1px solid #000",
              paddingBottom: "0.75rem",
              marginBottom: "2rem",
            }}
          >
            Shopping Cart
          </h2>

          {/* Cart Items */}
          <div className="d-flex flex-column gap-3 mb-5">
            {cartItems.map((item) => (
              <div
                key={item.product}
                className="d-flex justify-content-between align-items-center p-4"
                style={{
                  border: "1px solid #000",
                  borderRadius: "8px",
                  background: "#fff",
                  transition: "all 0.3s ease",
                }}
              >
                <div>
                  <h5
                    className="mb-2"
                    style={{
                      fontSize: "1rem",
                      fontWeight: 400,
                      textTransform: "uppercase",
                    }}
                  >
                    {item.name}
                  </h5>
                  <p
                    className="text-muted mb-1"
                    style={{
                      fontSize: "0.85rem",
                      textTransform: "uppercase",
                    }}
                  >
                    Quantity: {item.qty}
                  </p>
                  <p
                    className="mb-0"
                    style={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      color: "#000",
                    }}
                  >
                    ${item.price * item.qty}
                  </p>
                </div>

                <Button
                  variant="outline-dark"
                  size="sm"
                  style={{
                    borderRadius: "4px",
                    padding: "6px 14px",
                    textTransform: "uppercase",
                    fontSize: "0.8rem",
                    fontWeight: 400,
                    backgroundColor: "#fff",
                    color: "#000",
                    border: "1px solid #000",
                  }}
                  onClick={() => removeItem(item.product)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div
            style={{
              border: "1px solid #000",
              borderRadius: "8px",
              padding: "2rem",
              maxWidth: "400px",
              marginLeft: "auto",
            }}
          >
            <h5
              style={{
                textTransform: "uppercase",
                fontWeight: 400,
                borderBottom: "1px solid #000",
                paddingBottom: "0.5rem",
                marginBottom: "1.5rem",
              }}
            >
              Order Summary
            </h5>

            <div className="d-flex justify-content-between mb-3">
              <span className="text-muted">Subtotal</span>
              <span>${subTotal}</span>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <span className="text-muted">Shipping</span>
              <span>${shippingPrice}</span>
            </div>

            <hr />

            <div
              className="d-flex justify-content-between mb-4"
              style={{ fontWeight: 500 }}
            >
              <span>Total</span>
              <span>${total}</span>
            </div>

            <Button
              as={NavLink}
              to="/checkout"
              style={{
                width: "100%",
                padding: "0.8rem",
                backgroundColor: "#000",
                color: "#fff",
                border: "1px solid #000",
                borderRadius: "6px",
                textTransform: "uppercase",
                fontWeight: 400,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) =>
                ((e.target.style.backgroundColor = "#fff"),
                (e.target.style.color = "#000"))
              }
              onMouseLeave={(e) =>
                ((e.target.style.backgroundColor = "#000"),
                (e.target.style.color = "#fff"))
              }
            >
              Proceed to Checkout
            </Button>
          </div>
        </Container>
      )}
    </section>
  );
};

export default CartPage;
