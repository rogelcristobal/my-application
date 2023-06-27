import axios from "axios";
import React from "react";

const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [data, setData] = React.useState(null); //firebase auth
  const [loading, setLoading] = React.useState(true);
  
  const [currentUser, setCurrentUser] = React.useState(null); // context for connecting user in db
  const [userDataLoading, setuserDataLoading] = React.useState(true);


  // pass the firebase UID to the header
  //  !!only in this component
  const headers = {
    firebaseUID: data?.uid,
    "Content-Type": "application/json",
  };

  const fetchData = async () => {
    if (data) {
      try {
        const response = await axios.get(
          `http://localhost:3001/dashboard/`,{headers}
        );
        setCurrentUser(response.data);
        // waiting for the data to fully fetched
        setuserDataLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  React.useEffect(() => {
    fetchData();
    return () => {
      fetchData();
      setCurrentUser(null);
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
