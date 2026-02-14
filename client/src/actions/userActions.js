import axios from "axios";
import {
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_LOGIN_SUCCESS,
} from "../constants/userConstants";

export const updateUserProfile = (userData) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put("/api/users/profile", userData, config);  // Back to real route

    // Update profile state
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    // Update auth state
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    // Update localStorage
    localStorage.setItem("userInfo", JSON.stringify(data));

    console.log("Profile update success");
  } catch (error) {
    console.log("Profile update error:", error.response?.data || error.message);
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
