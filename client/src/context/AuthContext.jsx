import axios from "axios";
import React from "react";
import { useSelector,useDispatch } from "react-redux";
const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const currentuser = useSelector((state)=>state.user.currentUser) //firebase auth
  const [currentUser, setCurrentUser] = React.useState(null); // context for connecting user in db
  const [userDataLoading, setuserDataLoading] = React.useState(true);


  // pass the firebase UID to the header
  //  !!only in this component
  const headers = {
    firebaseUID: currentuser?.uid,
    "Content-Type": "application/json",
  };

  const fetchData = async () => {
    if (currentuser) {
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
  }, [currentuser]);

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
