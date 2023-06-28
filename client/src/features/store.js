import {configureStore} from '@reduxjs/toolkit'
import userReducer from './user/firebaseCurrentUserSlice'
 export const store =  configureStore({
    reducer:{
      user:userReducer,
    }
 })