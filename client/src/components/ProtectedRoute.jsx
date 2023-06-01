import React, { Children } from "react";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ currentUser, userLoading, children }) => {
  if (userLoading) {
    return !currentUser ? (
      <div>loading...</div>
    ) : (
      <Navigate to="/login" replace />
    );
  } else {
    return currentUser ? children : <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
