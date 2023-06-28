import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    userLoading:true
}
export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        updateUser:(state,action)=>{
            state.currentUser = action.payload
        },
        updateLoading:(state,action)=>{
            state.userLoading = action.payload
        }

    }
}) 

export const {updateUser,updateLoading} = userSlice.actions
export default userSlice.reducer