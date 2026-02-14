import { createSlice } from "@reduxjs/toolkit";
import cookie from "js-cookie";

let userInfoFromCookie = cookie.get("userInfo");
try {
  if (userInfoFromCookie) {
    userInfoFromCookie = JSON.parse(userInfoFromCookie);
  } else {
    userInfoFromCookie = null;
  }
} catch (error) {
  userInfoFromCookie = null;
}

const initialState = {
  userInfo: userInfoFromCookie,
  loading: false,
  error: null,
};

const auth = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    addUserInfo: (state, { payload }) => {
      state.userInfo = payload;
      state.loading = false;
      state.error = null;
      cookie.set("userInfo", JSON.stringify(payload));
    },
    removeUserInfo: (state) => {
      state.userInfo = null;
      state.loading = false;
      state.error = null;
      cookie.remove("userInfo");
      localStorage.removeItem("profileImage");
      localStorage.removeItem("orderDispatchStatus");
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const { addUserInfo, removeUserInfo, setLoading, setError } = auth.actions;
export default auth.reducer;
