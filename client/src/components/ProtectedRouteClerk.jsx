import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';

const ProtectedRouteClerk = ({ element, ...rest }) => {
 const { isSignedIn, isLoaded } = useClerk();

  if (!isLoaded) {
    return null; // or a loading indicator
  }

  if (!isSignedIn) {
    return <Navigate to="/login" />;
  }

  return <Route {...rest} element={element} />;
};

export default ProtectedRouteClerk;
