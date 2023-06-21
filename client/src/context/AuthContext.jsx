import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { auth } from "../firebase-config";
import { useQueries, useQuery } from "@tanstack/react-query";

const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [data, setData] = React.useState(null); //firebase auth
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [userDataLoading, setuserDataLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      if (data) {
        try {
          const response = await axios.get(
            `http://localhost:3001/dashboard/${data?.uid}`
          );
          setCurrentUser(response.data);
          setuserDataLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();

    return () => {
      fetchData();
      setCurrentUser(null)
      setuserDataLoading(true);
    };
  }, [data]);
  return (
    <AuthContext.Provider
      value={{
        setData,
        currentUser,
        setCurrentUser,
        userDataLoading,
        loading,
        setLoading,
        data,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
