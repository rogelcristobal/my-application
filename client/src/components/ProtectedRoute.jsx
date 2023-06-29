import React, { Children } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ children }) => {
  const data = useSelector((state)=>state.user.firebaseCurrentUser)
  const loading = useSelector((state)=>state.user.firebaseCurrentUserLoading)
  if(loading){
    return <div>loading</div>
  }else if(!loading&&!data){
    return <Navigate to='/login' replace/>
  }else if(!loading&&data){
    return children
  }
  
};

export default ProtectedRoute;
