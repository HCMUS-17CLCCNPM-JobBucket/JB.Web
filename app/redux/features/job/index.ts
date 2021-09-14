import { createSlice } from "@reduxjs/toolkit";

export const favSlice = createSlice({
  name: "job",
  initialState: {
    interest: [],
    apply: [],
  },
  reducers: {
    initInterest: (state, action) => {
      state.interest = [...action.payload];
      return state;
    },
    addInterest: (state, action) => {
      state.interest.push(action.payload);

      return state;
    },
    deleteInterest: (state, action) => {
      const temp = state.interest.filter(function (value, index) {
        return value.id !== action.payload;
      });

      state.interest = [...temp];
      return state;
    },
    //apply
    initApply: (state, action) => {
      state.apply = [...action.payload];
      return state;
    },
    addApply: (state, action) => {
      state.apply.push(action.payload);

      return state;
    },
    deleteApply: (state, action) => {
      const temp = state.apply.filter(function (value, index) {
        return value.id !== action.payload;
      });

      state.apply = [...temp];
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addInterest,
  initInterest,
  deleteInterest,
  addApply,
  initApply,
  deleteApply,
} = favSlice.actions;

export default favSlice.reducer;
