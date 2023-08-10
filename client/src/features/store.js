import {configureStore} from '@reduxjs/toolkit'
import currentUserReducer from './user/currentUserSlice'
 export const store =  configureStore({
    reducer:{
      currentUser:currentUserReducer
    }
 })