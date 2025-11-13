import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../../services/api-client";
import Loader from "../../components/Loader";
import AlertMessage from "../../components/AlertMessage";
import { Button, Container, Form } from "react-bootstrap";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import TextField from "../../components/TextField";
import CheckField from "../../components/CheckField";

const EditProductPage = () => {
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is Required").min(3),
    price: yup.number().required("Price is Required"),
    description: yup.string().max(1000),
    category: yup.string().max(50),
    countInStock: yup.number(),
    isActive: yup.bool().required(),
  });

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    apiClient
      .get("https://api.escuelajs.co/api/v1/products" , {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then(({ data }) => setProduct(data))
      .catch((err) => {
        setError(err.response?.data?.message || err.message);
      })
      .finally(() => setLoading(false));
  }, [id, userInfo]);

  const onSubmit = (values) => {
    setLoading(true);
    apiClient
      .put(`/admin/products/${id}`, values, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then(({ data }) => {
        toast.success("The Product Has Been Updated Successfully!");
        setProduct(data);
      })
      .catch((err) => {
        const msg = err.response?.data?.message || err.message;
        toast.error(msg);
      })
      .finally(() => setLoading(false));
  };

  if (loading) return <Loader />;
  if (error) return <AlertMessage variant="danger">{error}</AlertMessage>;

  return (
    <Container
      fluid
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
        color: "#2e2e2e",
        minHeight: "100vh",
        padding: "80px 15px",
      }}
    >
      {product && (
        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            backgroundColor: "#fff",
            padding: "40px",
            borderRadius: "10px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "35px",
              fontWeight: "600",
              fontSize: "1.8rem",
            }}
          >
            Edit Product
          </h2>
          <Formik
            onSubmit={onSubmit}
            initialValues={product}
            validationSchema={validationSchema}
          >
            <Form>
              <TextField
                name="name"
                placeholder="Product Name"
                style={inputStyle}
              />
              <TextField
                name="price"
                placeholder="Price"
                style={inputStyle}
              />
              <TextField
                name="description"
                placeholder="Description"
                as="textarea"
                rows={3}
                style={inputStyle}
              />
              <TextField
                name="category"
                placeholder="Category"
                style={inputStyle}
              />
              <TextField
                name="countInStock"
                placeholder="Stock Count"
                style={inputStyle}
              />
              <div style={{ marginBottom: "20px" }}>
                <CheckField name="isActive" />
              </div>
              <Button
                type="submit"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "5px",
                  fontSize: "16px",
                  backgroundColor: "#2e2e2e",
                  color: "#fff",
                  border: "none",
                  fontWeight: "600",
                }}
              >
                Update Product
              </Button>
            </Form>
          </Formik>
        </div>
      )}
    </Container>
  );
};

const inputStyle = {
  backgroundColor: "transparent",
  border: "none",
  borderBottom: "2px solid #2e2e2e",
  borderRadius: "0",
  marginBottom: "25px",
  color: "#2e2e2e",
  padding: "10px 0",
  fontFamily: "'Poppins', sans-serif",
  outline: "none",
};

export default EditProductPage;
