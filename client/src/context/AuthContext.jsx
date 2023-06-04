import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { auth } from "../firebase-config";
import { useQueries, useQuery } from "@tanstack/react-query";

const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [userLoading, setUserLoading] = React.useState(true);

  const [data, setData] = React.useState(null);
 
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in
        // Perform actions for authenticated user
        setCurrentUser(user);
        setUserLoading(false);

        const res = await axios.get(`http://localhost:3001/dashboard/${user.uid}`)
        setData(res.data)


      } else {
        // User is signed out
        // Perform actions for signed out user
        setCurrentUser({});
        setData({})
        setUserLoading(true);
      }
    });
    // Clean up the event listener when the component unmounts
    return () => unsubscribe();
  }, []);


  if(!userLoading){
    console.log(data)
  }
  

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userLoading,
        data,
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
