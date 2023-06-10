import React, { Children } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";
const ProtectedRoute = ({ children }) => {

  const {data,loading} = React.useContext(AuthContext)
  if(loading){
    return <div>loading</div>
  }if(!loading && !data){
    return <Navigate to="/login" replace/>
  }else{
    return children
  }
  
};

export default ProtectedRoute;
