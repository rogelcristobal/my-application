import React, { Children } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ children }) => {
  const data = useSelector((state)=>state.user.currentUser)
  const loading = useSelector((state)=>state.user.userLoading)
  if(loading){
    return <div>loading</div>
  }else if(!loading&&!data){
    return <Navigate to='/login' replace/>
  }else if(!loading&&data){
    return children
  }
  
};

export default ProtectedRoute;
