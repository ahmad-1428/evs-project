import { Form, Formik } from "formik";
import { Button, Col, Container, Row, Card } from "react-bootstrap";
import TextField from "./TextField";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addShippingAddress } from "../redux/cartSlice";

// ✅ Validation Schema
const validationSchema = yup.object({
  street: yup.string().required("Address is required."),
  city: yup.string().required("City is required."),
  country: yup.string().required("Country is required."),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number can only contain digits.")
    .required("Phone number is required."),
  extraDetails: yup.string(),
});

const ShippingInfo = () => {
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);

  const initialValues = {
    street: shippingAddress?.street || "",
    city: shippingAddress?.city || "",
    country: shippingAddress?.country || "",
    phone: shippingAddress?.phone || "",
    extraDetails: shippingAddress?.extraDetails || "",
  };

  const handleSubmit = (values) => {
    dispatch(addShippingAddress(values));
  };

  // ✅ Modern Card Style
  const cardStyle = {
    border: "none",
    borderRadius: "16px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    background: "#fff",
    padding: "2.5rem",
  };

  return (
    <Container fluid style={{ fontFamily: "'Poppins', sans-serif", padding: 0 }}>
      <Row className="justify-content-center mx-0">
        <Col md={12}>
          <Card style={cardStyle}>
            <div className="text-center mb-4">
              <h3
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "0.5rem",
                }}
              >
                Shipping Information
              </h3>
              <p
                style={{
                  color: "#666",
                  fontSize: "0.95rem",
                  marginBottom: "0",
                }}
              >
                Please provide your delivery details below.
              </p>
            </div>

            {shippingAddress ? (
              <div
                style={{
                  backgroundColor: "#fafafa",
                  borderRadius: "12px",
                  padding: "1.8rem",
                  border: "1px solid #eee",
                }}
              >
                <h5
                  style={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    marginBottom: "1rem",
                    color: "#222",
                  }}
                >
                  Saved Address
                </h5>
                <div style={{ lineHeight: "1.8", color: "#444" }}>
                  <p style={{ marginBottom: "0.3rem" }}>
                    <strong>Address:</strong> {shippingAddress.street}, {shippingAddress.city},{" "}
                    {shippingAddress.country}
                  </p>
                  <p style={{ marginBottom: "0.3rem" }}>
                    <strong>Phone:</strong> {shippingAddress.phone}
                  </p>
                  {shippingAddress.extraDetails && (
                    <p>
                      <strong>Notes:</strong> {shippingAddress.extraDetails}
                    </p>
                  )}
                </div>
                <Button
                  variant="dark"
                  className="w-100 mt-4"
                  onClick={() => dispatch(addShippingAddress(null))}
                  style={{
                    borderRadius: "8px",
                    padding: "0.8rem",
                    fontWeight: 500,
                    textTransform: "uppercase",
                  }}
                >
Edit Info                </Button>
              </div>
            ) : (
              <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
              >
                <Form>
                  <Row className="gy-3">
                    <Col md={12}>
                      <TextField name="street" type="text" placeholder="Street Address" />
                    </Col>
                    <Col md={6}>
                      <TextField name="city" type="text" placeholder="City" />
                    </Col>
                    <Col md={6}>
                      <TextField name="country" type="text" placeholder="Country" />
                    </Col>
                    <Col md={6}>
                      <TextField name="phone" type="text" placeholder="Phone Number" />
                    </Col>
                    <Col md={12}>
                      <TextField
                        name="extraDetails"
                        type="text"
                        placeholder="Additional Notes (Optional)"
                        as="textarea"
                        rows="3"
                      />
                    </Col>
                  </Row>

                  <Button
                    type="submit"
                    className="mt-4 w-100"
                    style={{
                      backgroundColor: "#000",
                      border: "1px solid #000",
                      borderRadius: "8px",
                      fontWeight: 500,
                      textTransform: "uppercase",
                      padding: "0.9rem",
                      fontSize: "0.95rem",
                    }}
                  >
Save Info                  </Button>
                </Form>
              </Formik>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ShippingInfo;
