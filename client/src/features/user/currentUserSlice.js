import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  data: null,
  loading: true,
  error: null,
};

export const fetchUser = createAsyncThunk(
  "currentuser/fetchUser",
  async (uid) => {
    const response = await axios.get(`http://localhost:3001/dashboard/`, {
      firebaseUID: uid,
      "Content-Type": "application/json",
    });
    return response.data
  }
);

export const currentuserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder
    .addCase(fetchUser.pending, (state)=>{
        state.loading = true
        state.error = null
    })
    .addCase(fetchUser.fulfilled, (state,action)=>{
        state.data = action.payload
        state.loading = false
    })
    .addCase(fetchUser.rejected, (state,action)=>{
        state.error = action.error.message
        state.loading = false
    })
  }
});

export const {} = currentuserSlice.actions;
export default currentuserSlice.reducer;
