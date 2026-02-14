import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";  // Added: For route change detection
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
import { toast } from "react-toastify";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();  // Added: Detect route changes

  // Get current global auth state
  const { userInfo } = useSelector((state) => state.auth);
  // Get update status from the update reducer
  const { loading, success, error } = useSelector((state) => state.userUpdateProfile || {});

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  // Load data on mount from Redux or localStorage
  useEffect(() => {
    console.log("Profile useEffect triggered. userInfo:", userInfo);
    const storedUserInfo = userInfo || JSON.parse(localStorage.getItem('userInfo'));
    if (storedUserInfo) {
      setName(storedUserInfo.name || "");
      setEmail(storedUserInfo.email || "");
      console.log("Local name set to:", storedUserInfo.name);
    }
  }, [userInfo]);

  // Auto-refresh on route change (e.g., when navigating to /profile)
  useEffect(() => {
    console.log("Route changed to profile - refreshing from localStorage");
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (storedUserInfo) {
      setName(storedUserInfo.name || "");
      setEmail(storedUserInfo.email || "");
    }
  }, [location.pathname]);  // Added: Triggers on route change

  // Show success toast and force sync
  useEffect(() => {
    if (success) {
      toast.success("Profile Updated Successfully!");
      console.log("Success toast shown. Updated userInfo:", userInfo);
      // Force sync from localStorage
      const updatedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (updatedUserInfo) {
        setName(updatedUserInfo.name || "");
      }
    }
  }, [success]);

  // Show error toast
  useEffect(() => {
    if (error) {
      toast.error(`Update failed: ${error}`);
    }
  }, [error]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        localStorage.setItem("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length < 3) {
      toast.error("Name must be at least 3 characters");
      return;
    }
    console.log("Dispatching update with name:", name.trim());
    dispatch(updateUserProfile({ name: name.trim() }));
  };

  return (
    <MDBContainer className="py-5">
      <MDBRow className="justify-content-center">
        <MDBCol md="4">
          <MDBCard className="text-center">
            <MDBCardBody>
              <input type="file" onChange={handleImageChange} id="fileInput" hidden />
              <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
                <MDBCardImage
                  src={image}
                  className="rounded-circle"
                  style={{ width: "150px", height: "150px", objectFit: "cover" }}
                />
              </label>
              <p className="mt-2 text-muted">Click image to change locally</p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <h4>Profile Settings</h4>
              <form onSubmit={handleSubmit}>
                <MDBInput
                  label="Full Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mb-3"
                  required
                />
                <MDBInput label="Email" type="email" value={email} disabled className="mb-4" />
                <MDBBtn 
                  type="submit" 
                  color="dark" 
                  className="w-100"
                  disabled={loading || name.trim() === userInfo?.name}
                >
                  {loading ? "Updating..." : "Update Name"}
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
