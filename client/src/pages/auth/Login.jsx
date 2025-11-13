import { Button, Card, Spinner } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import apiClient from "../../../services/api-client";
import TextField from "../../components/TextField";
import { addUserInfo } from "../../redux/authSlice";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👈 toggle state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter a valid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be 6 characters minimum")
      .matches(/[a-z]/, "Must contain a lowercase character")
      .matches(/[A-Z]/, "Must contain an uppercase character")
      .matches(/[0-9]/, "Must contain a number"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    setLoading(true);
    apiClient
      .post("/auth/login", values)
      .then(({ data }) => {
        dispatch(addUserInfo(data));
        toast.success(`Welcome back ${data.name}!`);
        navigate("/");
      })
      .catch((err) => {
        let message =
          err.response?.data?.message || err.message || "Login failed";
        toast.error(message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#fff",
        fontFamily: "Poppins, sans-serif",
        padding: "1rem", // ✅ makes mobile friendly
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "400px",
          border: "1px solid #000",
          borderRadius: 0,
          backgroundColor: "#fff",
        }}
        className="p-4 shadow-sm"
      >
        <h2
          className="text-center mb-4"
          style={{
            fontWeight: 400,
            textTransform: "uppercase",
            color: "#000",
          }}
        >
          Login
        </h2>

        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <Form className="w-100">
            {/* Email */}
            <TextField
              name="email"
              type="email"
              placeholder="Email"
              style={{
                border: "1px solid #000",
                borderRadius: 0,
              }}
            />

            {/* Password with Show/Hide */}
            <div style={{ position: "relative" }}>
              <Field
                as={TextField}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                style={{
                  border: "1px solid #000",
                  borderRadius: 0,
                  width: "100%",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  color: "#000",
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Submit Button */}
            <Button
              variant="dark"
              className="mt-3 w-100"
              type="submit"
              disabled={loading}
              style={{
                borderRadius: 0,
                fontWeight: 400,
                textTransform: "uppercase",
                border: "1px solid #000",
              }}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Loading...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </Form>
        </Formik>

        <p
          className="text-center mt-4"
          style={{ fontWeight: 400, fontSize: "0.9rem" }}
        >
          Don't have an account?{" "}
          <a
            href="/auth/register"
            style={{ color: "#000", fontWeight: 600, textTransform: "uppercase" }}
          >
            Register
          </a>
        </p>
      </Card>
    </div>
  );
};

export default Login;
