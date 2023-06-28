import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const firebaseCurrentUser = useSelector((state)=>state.user.firebaseCurrentUser) //firebase auth
  const [currentUser, setCurrentUser] = React.useState(null); // context for connecting user in db
  const [userDataLoading, setuserDataLoading] = React.useState(true);


  // pass the firebase UID to the header
  //  !!only in this component
  const headers = {
    firebaseUID: firebaseCurrentUser?.uid,
    "Content-Type": "application/json",
  };

  const fetchData = async () => {
    if (firebaseCurrentUser) {
      try {
        const response = await axios.get(
          `http://localhost:3001/dashboard/`,{headers}
          );
          setCurrentUser(response.data);
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
  }, [firebaseCurrentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userDataLoading,
        }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
