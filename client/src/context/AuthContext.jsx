import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { auth } from "../firebase-config";
import { useQueries, useQuery } from "@tanstack/react-query";

const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [userLoading, setUserLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async(user) => {
      if (user) {
        // User is signed in
        // console.log("User is signed in:", user);
        // Perform actions for authenticated user
        const res = await axios.get(`http://localhost:3001/dashboard/64789ca1b5c875462fb5ed25`)
        setCurrentUser(res.data);

        setUserLoading(false);
      } else {
        // User is signed out
        // console.log("User is signed out");
        // Perform actions for signed out user
        setCurrentUser({});
        setUserLoading(true);
      }
    });

    // Clean up the event listener when the component unmounts
    return () => unsubscribe();
  }, []);
  console.log(currentUser)

  return (
    <AuthContext.Provider
      value={{
        currentUser,

        userLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
