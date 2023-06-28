import {configureStore} from '@reduxjs/toolkit'
import userReducer from './user/firebaseCurrentUserSlice'
import currentUserReducer from './user/currentUserSlice'
 export const store =  configureStore({
    reducer:{
      user:userReducer,
      currentUser:currentUserReducer
    }
 })