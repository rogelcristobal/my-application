import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const DBCurrentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {},
});

export const {} = DBCurrentUserSlice.actions;
export default DBCurrentUserSlice.reducer;
