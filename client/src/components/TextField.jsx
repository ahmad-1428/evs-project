import { useField } from "formik";
import { Form } from "react-bootstrap";

const TextField = ({ name, placeholder, ...props }) => {
  const [field, meta] = useField(name);

  return (
    <Form.Group style={{ marginBottom: "25px" }}>
      <Form.Control
        {...field}
        {...props} // 👈 type="password" will now work
        placeholder={placeholder}
        isInvalid={meta.touched && meta.error}
        style={{
          border: "none",
          borderBottom: "2px solid #2e2e2e", // Only bottom border
          borderRadius: 0,
          backgroundColor: "transparent",
          fontFamily: "'Poppins', sans-serif",
          color: "#2e2e2e",
          padding: "10px 0",
          boxShadow: "none",
        }}
      />
      {meta.touched && meta.error && (
        <div style={{ color: "red", fontSize: "0.875rem", marginTop: "5px" }}>
          {meta.error}
        </div>
      )}
    </Form.Group>
  );
};

export default TextField;
