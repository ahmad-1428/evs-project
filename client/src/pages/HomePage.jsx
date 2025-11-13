import { useState, useEffect } from "react";
import { Col, Row, Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import Loader from "../components/Loader";
import axios from "axios";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((res) => {
        const limited = res.data.slice(0, 30);
        setProducts(limited);
      })
      .catch((err) => {
        setError("Error fetching products: " + err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;
  if (error) return <AlertMessage>{error}</AlertMessage>;

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", minHeight: "100vh" }}>
      {/* ✅ Hero Banner */}
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          marginTop: 0,
          overflow: "hidden",
        }}
      >
        {/* Background Image */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523275335684-37898b6baf30')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            zIndex: 0,
          }}
        >
          {/* Overlay */}
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.4)",
            }}
          />
        </div>

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            padding: "2rem 1rem",
            maxWidth: "900px",
          }}
        >
          <h1
            style={{
              fontWeight: 500,
              textTransform: "uppercase",
              color: "#fff",
              fontSize: "clamp(1.8rem, 4vw, 3rem)", // responsive size
              letterSpacing: "2px",
              marginBottom: "1rem",
            }}
          >
            Swift Cart — Everything You Need, All in One Place
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              fontWeight: 300,
              color: "#fff",
              marginBottom: "1.5rem",
              lineHeight: 1.6,
            }}
          >
            Discover a wide range of products from the latest tech and stylish
            clothing to timeless watches and everyday essentials — all curated
            for quality and value.
          </p>
        </div>
      </div>

      {/* ✅ Product Section */}
      <div style={{ padding: "2rem 1rem" }}>
        <h2
          className="text-center mb-4"
          style={{
            fontWeight: 400,
            textTransform: "uppercase",
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
          }}
        >
          Our Products
        </h2>
        <Row className="g-4">
          {products.map((product) => (
            <Col key={product.id} xl={3} lg={4} md={6} sm={12}>
              <Card
                className="h-100 border"
                style={{
                  border: "1px solid #000",
                  borderRadius: 0,
                  backgroundColor: "#fff",
                }}
              >
                <div
                  style={{
                    aspectRatio: "1/1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={product.images[0]}
                    alt={product.title}
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
                <Card.Body className="d-flex flex-column justify-content-between p-3">
                  <Card.Title
                    style={{
                      fontSize: "1rem",
                      fontWeight: 400,
                      textTransform: "uppercase",
                      color: "#212529",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {product.title}
                  </Card.Title>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 400,
                      textTransform: "uppercase",
                    }}
                    className="mb-2"
                  >
                    <span className="fw-bold">${product.price}</span>
                  </div>
                  <Button
                    as={NavLink}
                    to={`/products/${product.id}`}
                    variant="dark"
                    className="w-100"
                    style={{
                      backgroundColor: "#000",
                      border: "1px solid #000",
                      borderRadius: 0,
                      color: "#fff",
                      fontWeight: 400,
                      textTransform: "uppercase",
                    }}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default HomePage;
