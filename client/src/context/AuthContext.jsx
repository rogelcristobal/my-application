import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { auth } from "../firebase-config";
import { useQueries, useQuery } from "@tanstack/react-query";

const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [userLoading, setUserLoading] = React.useState(true);

  const [userData, setUserData] = React.useState(null);
  const fetchData= async(uid)=>{
    if(uid){
      
      try {
      const res = await axios.get(`http://localhost:3001/dashboard/${uid}`)
      return res.data

    } catch (error) {
     throw new Error('Error fetching user data');
    }
    }
  }
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in
        // Perform actions for authenticated user
        setUserLoading(false);
        setCurrentUser(user);

        // const res = await axios.get(`http://localhost:3001/dashboard/${user.uid}`)
        // setUserData(res.data)


      } else {
        // User is signed out
        // Perform actions for signed out user
        setCurrentUser({});
        setUserData({})
        setUserLoading(true);
      }
    });
    // Clean up the event listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const { data, isLoading, error } = useQuery(['user', currentUser?.uid], () => fetchData(currentUser?.uid), {
    enabled: currentUser?.uid !== null,
  });


  if(!isLoading){
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
