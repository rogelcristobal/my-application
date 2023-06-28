import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  userLoading: true,
};
export const firebaseCurrentuserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.currentUser = action.payload;
    },
    updateLoading: (state, action) => {
      state.userLoading = action.payload;
    },
  },
});

export const { updateUser, updateLoading } = firebaseCurrentuserSlice.actions;
export default firebaseCurrentuserSlice.reducer;
