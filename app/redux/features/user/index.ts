import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    token: "",
    refreshToken: "",
    user: {
      avatarUrl: "",
    },
    refreshJob: false,
  },
  reducers: {
    updateRefresh: (state,action)=>{
      state.refreshJob = action.payload;
    },
    updateAvatar: (state, action) => {
      state.user.avatarUrl = action.payload;
    },
    getNewAccessToken: (state, action) => {
      state.token = action.payload;
      return state;
    },

    login: (state, action) => {
      state = { ...action.payload };
      return state;
    },
    logout: (state) => {
      state.user = { avatarUrl: "" };
      state.token = "";
      state.refreshToken = "";
      return state;
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      return state;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateEmail,
  login,
  logout,
  getNewAccessToken,
  updateProfile,
  updateAvatar,
  updateRefresh,
} = userSlice.actions;

export default userSlice.reducer;
