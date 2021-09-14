import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    token: "",
    refreshToken: "",
    user: {
      userRoles: [1],
    },
  },
  reducers: {
    getAccessToken: (state, action) => {
      state.token = action.payload;
      return state;
    },

    login: (state, action) => {
      state = { ...action.payload };
      return state;
    },
    logout: (state) => {
      state.email = "";
      state.token = "";
      state.refreshToken = "";
      return state;
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, getAccessToken, updateProfile } =
  userSlice.actions;

export default userSlice.reducer;
