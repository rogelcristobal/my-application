import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
  firebaseCurrentUser: null,
  firebaseCurrentUserLoading: true,
};


export const firebaseCurrentuserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.firebaseCurrentUser = action.payload;
    },
    updateLoading: (state, action) => {
      state.firebaseCurrentUserLoading = action.payload;
    },
  },
});

export const { updateUser, updateLoading } = firebaseCurrentuserSlice.actions;
export default firebaseCurrentuserSlice.reducer;
