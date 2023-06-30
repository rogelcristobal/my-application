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
    if (uid) {
      const headers = {
        firebaseUID: uid,
        "Content-Type": "application/json",
      };
      const response = await axios.get(`http://localhost:3001/dashboard/`, {
        headers,
      });
      return response.data;
    } else {
      return null;
    }
  }
);

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    deleteCurrentUserCollection: (state, action) => {
      const newData = {
        ...state.data,
        noteCollections: state.data.noteCollections.filter(
          (collection) => collection !== action.payload._id
        ),
      };
      state.data = newData;
      state.loading = false;
    },
    addCurrentUserCollection: (state, action) => {
      const newData = {
        ...state.data,
        noteCollections: [...state.data.noteCollections, action.payload._id],
      };
      state.data = newData;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { deleteCurrentUserCollection, addCurrentUserCollection } =
  currentUserSlice.actions;
export default currentUserSlice.reducer;
