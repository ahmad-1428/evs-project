// StripeForm.jsx
import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { orderSuccess } from "../redux/orderSlice";
import apiClient from "../../services/api-client";
import AlertMessage from "./AlertMessage";
import Loader from "./Loader";

const StripeForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { cartItems, shippingAddress, subTotal, shippingPrice, totalPrice } =
    useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!stripe || !elements) return;

    setLoading(true);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const payment = {
      id: paymentMethod.id,
      card: paymentMethod.card.brand,
      last4: paymentMethod.card.last4,
    };

    try {
      const reqData = {
        orderItems: cartItems,
        shippingAddress,
        shippingPrice,
        subTotal,
        totalPrice,
        paymentMethod: payment,
      };

      const { data } = await apiClient.post("/orders", reqData, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });

      dispatch(orderSuccess(data._id));
    } catch (err) {
      setError(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- STYLES ----------------
  const cardStyle = {
    width: "100%",
    backgroundColor: "#fff",
    border: "1px solid #e6e6e6",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 8px 24px rgba(16,24,40,0.06)",
    fontFamily: "'Poppins', sans-serif",
  };

  const titleStyle = {
    fontSize: "1.05rem",
    fontWeight: 500,
    textTransform: "uppercase",
    marginBottom: "14px",
    color: "#111",
    letterSpacing: "0.6px",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.85rem",
    color: "#333",
    textTransform: "uppercase",
    marginBottom: "6px",
    fontWeight: 500,
  };

  const stripeFieldWrapper = {
    border: "1px solid #eee",
    borderRadius: "10px",
    padding: "10px 12px",
    marginBottom: "16px",
    background: "#fafafa",
  };

  const stripeOptions = {
    style: {
      base: {
        fontSize: "15px",
        color: "#111",
        fontFamily: "'Poppins', sans-serif",
        "::placeholder": { color: "#9ca3af" },
      },
      invalid: { color: "#e53935" },
    },
  };

  const smallRowStyle = {
    display: "flex",
    gap: "12px",
  };

  const smallFieldWrapper = {
    flex: 1,
    border: "1px solid #eee",
    borderRadius: "10px",
    padding: "10px 12px",
    background: "#fafafa",
  };

  const textInput = {
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "15px",
    color: "#111",
    fontFamily: "'Poppins', sans-serif",
  };

  const submitBtn = {
    width: "100%",
    padding: "14px",
    backgroundColor: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "0.95rem",
    fontWeight: 600,
    marginTop: "20px", // 🔹 Increased spacing above button
    cursor: "pointer",
    transition: "0.2s ease-in-out",
  };

  return (
    <div style={cardStyle}>
      {error && <AlertMessage>{error}</AlertMessage>}
      {loading && <Loader />}

      <Form onSubmit={handleSubmit}>
        <h5 style={titleStyle}>Payment Information</h5>

      
        <div style={stripeFieldWrapper}>
          <CardNumberElement options={stripeOptions} />
        </div>

        <div style={stripeFieldWrapper}>
          <input
            type="text"
            placeholder="Cardholder Name"
            style={textInput}
            required
          />
        </div>

        <div style={smallRowStyle}>
          <div style={smallFieldWrapper}>
            
            <CardExpiryElement options={stripeOptions} />
          </div>

          <div style={smallFieldWrapper}>
       
            <CardCvcElement options={stripeOptions} />
          </div>
        </div>

        <button type="submit" style={submitBtn}>
          Pay {totalPrice ? `— $${Number(totalPrice).toFixed(2)}` : "Now"}
        </button>
      </Form>
    </div>
  );
};

export default StripeForm;
