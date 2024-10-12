import { createSlice } from "@reduxjs/toolkit";
// import { setLocalStorageData } from "../../utils/helper.js";

const user = JSON.parse(localStorage.getItem("vi")) || null;

const initialState = {
  user,
  isLoggedIn: !!user,
};

export const userAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("vi", JSON.stringify(action.payload));
      // setLocalStorageData("vi", action.payload, 3);
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.clear("vi");
    },
  },
});

export const { login, logout } = userAuthSlice.actions;

export default userAuthSlice.reducer;
