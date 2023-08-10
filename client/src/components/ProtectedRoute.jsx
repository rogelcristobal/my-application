
import PropTypes from 'prop-types'
import { Navigate } from "react-router-dom";
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
    return <Navigate to="/auth/sign-in" replace />;
  }

  return children;
};

ProtectedRoute.propTypes={
  children:PropTypes.node
}

export default ProtectedRoute;
