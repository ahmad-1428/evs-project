import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../actions/userActions";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.orderList || { orders: [] });

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (userInfo) {
      setImage(
        userInfo.image ||
          "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
      );
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { name, email, image };
    dispatch(updateUserProfile(updatedUser));
  };

  if (!userInfo)
    return (
      <MDBContainer className="py-5">
        <h5>Loading...</h5>
      </MDBContainer>
    );

  return (
    <MDBContainer
      className="py-5"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <MDBRow className="justify-content-center">
        {/* Profile Picture */}
        <MDBCol md="4" className="mb-4">
          <MDBCard className="text-center">
            <MDBCardBody>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="fileInput"
                hidden
              />
              <label htmlFor="fileInput">
                <MDBCardImage
                  src={image}
                  alt="avatar"
                  className="rounded-circle"
                  fluid
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
              </label>
              <p className="mt-3 text-muted">Click image to upload</p>
              {/* Orders Count */}
              <h6 className="mt-3 fw-bold" style={{ textTransform: "uppercase" }}>
                Total Orders:{" "}
                <span style={{ color: "#000" }}>
                  {orders ? orders.length : 0}
                </span>
              </h6>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        {/* Profile Form */}
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <form onSubmit={handleSubmit}>
                <MDBRow className="mb-3">
                  <MDBCol md="12">
                    <MDBInput
                      label="Full Name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      contrast
                    />
                  </MDBCol>
                </MDBRow>

                <MDBRow className="mb-4">
                  <MDBCol md="12">
                    <MDBInput
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      contrast
                    />
                  </MDBCol>
                </MDBRow>

                <MDBBtn
                  type="submit"
                  color="dark"
                  className="w-100"
                  style={{ textTransform: "uppercase" }}
                >
                  Update Profile
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ProfilePage;
