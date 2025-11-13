import { useField } from "formik";
import { Form } from "react-bootstrap";

const CheckField = ({ name, label = "in Stock" }) => {
  const [field] = useField({ name, type: "checkbox" });

  return (
    <>
      <style>
        {`
          .custom-toggle-container {
            display: flex;
            align-items: center;
            gap: 12px;
            font-family: 'Poppins', sans-serif;
            color: #2e2e2e;
            margin-bottom: 25px;
          }

          .custom-switch {
            position: relative;
            display: inline-block;
            width: 50px;
            height: 26px;
          }

          .custom-switch input {
            opacity: 0;
            width: 0;
            height: 0;
          }

          .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: 0.4s;
            border-radius: 34px;
          }

          .slider:before {
            position: absolute;
            content: "";
            height: 20px;
            width: 20px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: 0.4s;
            border-radius: 50%;
          }

          input:checked + .slider {
            background-color: #2e2e2e;
          }

          input:checked + .slider:before {
            transform: translateX(24px);
          }
        `}
      </style>

      <div className="custom-toggle-container">
        <label className="custom-switch">
          <input type="checkbox" {...field} />
          <span className="slider"></span>
        </label>
        <span>{label}</span>
      </div>
    </>
  );
};

export default CheckField;
