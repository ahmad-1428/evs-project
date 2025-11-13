import { Card } from "react-bootstrap";
import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
    <main
      id='authLayout'
      className='d-flex justify-content-center align-items-center bg-dark'
    >
      <Card style={{ width: "4000px" }}>
        <Outlet />
      </Card>
    </main>
  );
};

export default AuthLayout;
