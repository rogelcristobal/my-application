import React from "react";
import {  onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  React.useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
