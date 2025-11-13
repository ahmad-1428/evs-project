import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import AlertMessage from "../components/AlertMessage";
import apiClient from "../../services/api-client";
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

const OrderPage = () => {
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems, subTotal, shippingPrice, totalPrice } = useSelector(
    (state) => state.cart
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get(`/orders/${id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      })
      .then(({ data }) => setOrder(data))
      .catch((err) => {
        const msg =
          err.response?.data?.message || err.message || "Something went wrong";
        setError(msg);
      })
      .finally(() => setLoading(false));
  }, [id, userInfo]);

  if (loading) return <Loader />;
  if (error) return <AlertMessage>{error}</AlertMessage>;

  if (!order) return null;

  return (
    <section style={{ fontFamily: "'Poppins', sans-serif", background: "#fff", minHeight: "100vh", padding: "2rem 1rem" }}>
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol xs={12} md={10} lg={8}>
            <MDBCard style={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
              {/* Header */}
              <MDBCardHeader className="bg-dark text-white py-4 px-4">
                <MDBTypography tag="h5" className="mb-0">
                  Thank you for your order, {userInfo?.name || "Guest"}!
                </MDBTypography>
              </MDBCardHeader>

              <MDBCardBody className="p-4">
                {/* Receipt info */}
                {/* <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4">
                  <p className="lead mb-2 mb-md-0">Receipt</p>
                  <p className="small text-muted mb-0">Voucher: {order.receiptVoucher || "1KAU9-84UIL"}</p>
                </div> */}

                {/* Items */}
                <MDBCard className="shadow-0 border mb-4">
                  {cartItems.map((item) => (
                    <MDBCardBody key={item.product} className="py-2 px-3">
                      <MDBRow className="align-items-center text-center text-md-start">
                        <MDBCol xs={12} md={4}>
                          <p className="text-dark mb-1">{item.name}</p>
                        </MDBCol>
                        <MDBCol xs={6} md={4}>
                          <p className="text-muted mb-1">Qty: {item.qty}</p>
                        </MDBCol>
                        <MDBCol xs={6} md={4}>
                          <p className="text-muted mb-1">Price: ${item.price * item.qty}</p>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  ))}
                </MDBCard>

                {/* Order totals */}
                <div className="d-flex flex-column flex-md-row justify-content-between mb-2">
                  <p className="fw-bold mb-1">Order Details</p>
                  <div className="text-md-end">
                    <p className="mb-1"><span className="fw-bold">Subtotal:</span> ${subTotal}</p>
                    <p className="mb-1"><span className="fw-bold">Shipping:</span> ${shippingPrice}</p>
                    {/* <p className="mb-1"><span className="fw-bold">Invoice:</span> {order.invoiceNumber || "788152"}</p>
                    <p className="mb-0"><span className="fw-bold">Voucher:</span> {order.receiptVoucher || "18KU-62IIK"}</p> */}
                  </div>
                </div>
              </MDBCardBody>

              {/* Footer - Total Paid */}
              <MDBCardFooter className="bg-dark text-white py-4 px-4 d-flex justify-content-end">
                <MDBTypography tag="h5" className="mb-0">
                  Total Paid: <span className="h4 ms-2">${totalPrice}</span>
                </MDBTypography>
              </MDBCardFooter>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default OrderPage;
