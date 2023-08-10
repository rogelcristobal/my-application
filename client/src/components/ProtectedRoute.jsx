import React, { Children } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";
const ProtectedRoute = ({ children }) => {
  // const data = useSelector((state)=>state.user.firebaseCurrentUser)
  // const loading = useSelector((state)=>state.user.firebaseCurrentUserLoading)
  const { isLoaded, isSignedIn } = useUser();
  if (!isLoaded) {
    return (
      <div className="h-full w-full grid place-content-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
