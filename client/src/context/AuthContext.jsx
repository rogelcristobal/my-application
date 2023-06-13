import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { auth } from "../firebase-config";
import { useQueries, useQuery } from "@tanstack/react-query";

const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [data, setData] = React.useState(null);
    const [loading, setloading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setloading(true)
      if (user) {

        try {
          const response = await axios.get(
            `http://localhost:3001/dashboard/${user.uid}`
          );
          setData(response.data);
          setloading(false)
          
        } catch (error) {
          console.log(error);
        }
        
      } else {
        setData(null)
        setloading(false)
      }
     
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        // user auth in firebase
        loading,
        data, // user data from mdb that match uid with firebase/auth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
