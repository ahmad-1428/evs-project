import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Form,
  Button,
  Accordion,
} from "react-bootstrap";
import axios from "axios"; // use axios directly
import { addToCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Error from "../components/AlertMessage";
import Rating from "../components/Rating";

const ProductPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then(({ data }) => {
        setProduct(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const addItemToCart = () => {
    const payload = {
      name: product.title,
      qty: Number(qty),
      price: product.price,
      product: product.id,
    };
    dispatch(addToCart(payload));
    toast.success(`${product.title} Added to Cart!!!`);
    navigate("/cart");
  };

  if (loading) {
    return (
      <Row className="py-5">
        <Col>
          <Loader />
        </Col>
      </Row>
    );
  }

  if (error) {
    return (
      <Row>
        <Col>
          <Error>{error}</Error>
        </Col>
      </Row>
    );
  }

  return (
    <div
      className="container px-3 px-lg-5 my-5"
      style={{ fontFamily: "'Poppins', sans-serif", background: "white" }}
    >
      <Row className="gx-4 gx-lg-5 align-items-start">
        {/* Product Image */}
        <Col md={6} className="mb-4 mb-md-0 d-flex justify-content-center">
          <div
            style={{
              width: "100%",
              maxWidth: "500px",
              aspectRatio: "1/1",
              background: "#f8f8f8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <Image
              src={product.images?.[0]}
              alt={product.title}
              fluid
              style={{
                objectFit: "contain",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </Col>

        {/* Product Details */}
        <Col md={6}>
          {/* SKU */}
          <div
            style={{
              fontSize: "0.9rem",
              fontWeight: 400,
              color: "#2e2e2e",
              marginBottom: "0.5rem",
              textTransform: "uppercase",
            }}
          >
            SKU: PROD-{product.id}
          </div>

          {/* Title */}
          <h1
            style={{
              fontWeight: 400,
              color: "#2e2e2e",
              textTransform: "uppercase",
              fontSize: "1.8rem",
              marginBottom: "1rem",
            }}
          >
            {product.title}
          </h1>

          {/* Price */}
          <div
            style={{
              fontWeight: 400,
              fontSize: "1.3rem",
              marginBottom: "1rem",
              color: "#2e2e2e",
              textTransform: "uppercase",
            }}
          >
            ${product.price}
          </div>

          {/* Availability */}
          <div
            style={{
              fontSize: "1rem",
              marginBottom: "1.2rem",
              textTransform: "uppercase",
              color: product.id % 2 === 0 ? "#28a745" : "#dc3545", // fake stock
              fontWeight: 400,
            }}
          >
            {product.id % 2 === 0 ? "In Stock" : "Out of Stock"}
          </div>

          {/* QTY Dropdown */}
          <div className="mb-3">
            <label
              htmlFor="qty"
              style={{
                fontWeight: 400,
                fontSize: "0.95rem",
                marginBottom: "0.4rem",
                display: "block",
                textTransform: "uppercase",
                color: "#2e2e2e",
              }}
            >
              Qty
            </label>
            <Form.Select
              id="qty"
              onChange={(e) => setQty(e.target.value)}
              disabled={product.id % 2 !== 0}
              style={{
                fontWeight: 400,
                fontSize: "1rem",
                textTransform: "uppercase",
                border: "1px solid #000",
                borderRadius: 0,
              }}
            >
              {[...Array(10).keys()].map((stock) => (
                <option key={stock} value={stock + 1}>
                  {stock + 1}
                </option>
              ))}
            </Form.Select>
          </div>

          {/* Accordion for Description & Reviews */}
          <Accordion alwaysOpen className="mb-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header
                style={{ textTransform: "uppercase", fontWeight: 400 }}
              >
                Description
              </Accordion.Header>
              <Accordion.Body style={{ fontWeight: 400, fontSize: "0.95rem" }}>
                {product.description}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header
                style={{ textTransform: "uppercase", fontWeight: 400 }}
              >
                Reviews
              </Accordion.Header>
              <Accordion.Body>
                <Rating value={3} text={` from ${5} users`} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          {/* Add to Cart Button */}
          <Button
            onClick={addItemToCart}
            disabled={product.id % 2 !== 0}
            className="btn-lg w-100"
            style={{
              backgroundColor: "#000",
              color: "white",
              fontWeight: 400,
              textTransform: "uppercase",
              border: "1px solid #000",
              borderRadius: 0,
            }}
          >
            <i className="bi-cart-fill me-1" />
            Add to Cart
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ProductPage;
