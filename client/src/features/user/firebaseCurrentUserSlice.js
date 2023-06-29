import { createSlice} from "@reduxjs/toolkit";

const initialState = {
  firebaseCurrentUser: null,
  firebaseCurrentUserLoading: true,
};


export const firebaseCurrentuserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateFirebaseCurrentUser: (state, action) => {
      return{
        ...state,
        firebaseCurrentUser: action.payload
      }
    },
    updateFirebaseCurrentUserIsLoading: (state, action) => {
       return{
        ...state,
        firebaseCurrentUserLoading: action.payload
      }
    },
  },
});

export const { updateFirebaseCurrentUser, updateFirebaseCurrentUserIsLoading } = firebaseCurrentuserSlice.actions;
export default firebaseCurrentuserSlice.reducer;
