import { createSlice } from "@reduxjs/toolkit";
export const NotificationSlice = createSlice({
  name: "notifications",
  initialState: {
    alerts: [],
  },
  reducers: {
    createAlert: (state, action) => {
      state.alerts.push({
        message: action.payload.message,
        type: action.payload.type,
      });
    },
  },
  //   extraReducers: {
  //     new: (state, action) => {
  //       state.alerts.push({ message: action.error.message, type: "error" });
  //     },
  //   },
});

export const actions = NotificationSlice.actions;

export default NotificationSlice.reducer;
