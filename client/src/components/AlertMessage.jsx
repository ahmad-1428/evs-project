import { BsCheckCircle, BsInfoCircle, BsExclamationTriangle, BsXCircle } from "react-icons/bs";

const AlertMessage = ({ variant = "danger", children }) => {
  const styles = {
    base: {
      fontFamily: "'Poppins', sans-serif",
      padding: "1.2rem",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      margin: "1rem 0",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    },
    variants: {
      success: {
        backgroundColor: "#e6f4ea",
        color: "#2e7d32",
        icon: <BsCheckCircle size={22} />,
      },
      info: {
        backgroundColor: "#e7f3f9",
        color: "#0277bd",
        icon: <BsInfoCircle size={22} />,
      },
      warning: {
        backgroundColor: "#fff8e1",
        color: "#f57c00",
        icon: <BsExclamationTriangle size={22} />,
      },
      danger: {
        backgroundColor: "#fdecea",
        color: "#c62828",
        icon: <BsXCircle size={22} />,
      },
    },
  };

  const { backgroundColor, color, icon } = styles.variants[variant] || styles.variants.danger;

  return (
    <div style={{ ...styles.base, backgroundColor, color }}>
      <span>{icon}</span>
      <span style={{ flex: 1 }}>{children}</span>
    </div>
  );
};

export default AlertMessage;
