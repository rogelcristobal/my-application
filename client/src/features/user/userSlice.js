import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null,
    userLoading:false
}
export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        updateLoading:(state)=>{
            state.userLoading = !state.userLoading
        }
    }
}) 

export const {updateLoading} = userSlice.actions
export default userSlice.reducer