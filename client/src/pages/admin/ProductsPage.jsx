import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Badge, Row, Col, Container, Image, Form, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaPlus, FaEdit } from "react-icons/fa";
import axios from "axios";
import Loader from "../../components/Loader";
import AlertMessage from "../../components/AlertMessage";
import { toast } from "react-toastify";

const ProductsPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { userInfo } = useSelector((state) => state.auth);

  const charcoal = "#2e2e2e";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("https://api.escuelajs.co/api/v1/products");
        const normalizedProducts = data.map((p) => ({
          _id: p.id,
          title: p.title,
          images: p.images,
          category: { name: p.category?.name || "N/A" },
          countInStock: Math.floor(Math.random() * 20),
        }));
        setProducts(normalizedProducts);
      } catch (err) {
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addProductHandler = () => {
    toast.info("Redirect to add product page (not implemented)");
  };

  const getStockBadge = (count) => {
    if (count === 0)
      return <Badge bg="danger" className="px-3 py-2 rounded-pill">Out of Stock</Badge>;
    if (count < 10)
      return <Badge bg="warning" text="dark" className="px-3 py-2 rounded-pill">Low: {count}</Badge>;
    return <Badge bg="success" className="px-3 py-2 rounded-pill">{count}</Badge>;
  };

  const filteredProducts = products.filter((product) =>
    (product.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loader />;
  if (error) return <AlertMessage variant="danger">{error}</AlertMessage>;

  return (
    <Container fluid className="py-4" style={{ fontFamily: "'Poppins', sans-serif", background: "#f9f9f9" }}>
      {/* Header */}
      <Row className="align-items-center mb-4">
        <Col>
          <h2 style={{ color: charcoal, fontWeight: 700 }}>Product Inventory</h2>
          <p className="text-muted mb-0">Manage and modify all available products.</p>
        </Col>
        <Col className="text-end">
          <Button
            onClick={addProductHandler}
            style={{
              backgroundColor: "#fff",
              borderColor: "#ddd",
              color: charcoal,
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              borderRadius: "50px",
              padding: "10px 20px",
            }}
            className="d-flex align-items-center gap-2"
          >
            <FaPlus /> Add Product
          </Button>
        </Col>
      </Row>

      {/* Search */}
      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              borderRadius: "50px",
              padding: "10px 20px",
              border: "1px solid #ccc",
              backgroundColor: "#fff",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)"
            }}
          />
        </Col>
      </Row>

      {/* Table */}
      <div className="bg-white rounded-2 shadow-sm p-3 overflow-auto">
        <Table hover responsive className="align-middle mb-0" style={{ minWidth: "700px" }}>
          <thead style={{ backgroundColor: "#f4f4f4" }}>
            <tr style={{ color: charcoal }}>
              <th>Image</th>
              <th>Name</th>
              <th className="text-center">Category</th>
              <th className="text-center">Stock</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product._id} style={{ transition: "all 0.2s" }}>
                  <td>
                    <Image
                      src={product.images?.[0] || "/placeholder.png"}
                      alt={product.title || "No Name"}
                      height={48}
                      width={48}
                      rounded
                      style={{
                        objectFit: "cover",
                        border: "1px solid #e0e0e0",
                        padding: "2px",
                        backgroundColor: "#fafafa",
                      }}
                    />
                  </td>
                  <td className="fw-semibold">{product.title || "No Name"}</td>
                  <td className="text-center text-capitalize">{product.category?.name || "N/A"}</td>
                  <td className="text-center">{getStockBadge(product.countInStock)}</td>
                  <td className="text-center">
                    {/* Circle Edit Button - B&W */}
                    <Button
                      as={NavLink}
                      to={`/admin/products/${product._id}`}
                      variant="light"
                      className="d-flex align-items-center justify-content-center p-2 rounded-circle mx-auto"
                      style={{
                        width: "40px",
                        height: "40px",
                        border: "1px solid #ccc",
                        backgroundColor: "#fff",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f0f0f0";
                        e.currentTarget.style.borderColor = "#aaa";
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#fff";
                        e.currentTarget.style.borderColor = "#ccc";
                        e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.05)";
                      }}
                    >
                      <FaEdit size={16} color="#2e2e2e" />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-muted">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default ProductsPage;
