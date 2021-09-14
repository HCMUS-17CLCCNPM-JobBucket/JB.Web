import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
  name: "company",
  initialState: {},
  reducers: {
    init: (state, action) => {
      state = { ...action.payload };
      return state;
    },
    reset: (state, action) => {
      state = {};
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const companyActions = companySlice.actions;

export default companySlice.reducer;
