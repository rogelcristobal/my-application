import React from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";
import Axios from "axios";
const Login = () => {
  const [currentUser, setCurrentUser] = React.useState({});
  const [register, setRegister] = React.useState({
    email: "",
    password: "",
  });
  const registerUser = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        register.email,
        register.password
      );
      console.log(user);

      //  request storing uid and other data to the db
      if (user) {
        const response = await Axios.post(
          "http://localhost:3001/auth/register",
          {
            uid: user.uid,
            email: user.email,
          }
        );
        console.log(response.data);
        logout()
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        console.log("User is signed in:", user);
        // Perform actions for authenticated user
        setCurrentUser(user);
      } else {
        // User is signed out
        console.log("User is signed out");
        // Perform actions for signed out user
        setCurrentUser({});
      }
    });

    // Clean up the event listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="h-full">
      <p>register</p>
      <input
        className="sample"
        type="text"
        placeholder="email"
        onChange={(e) =>
          setRegister({
            ...register,
            email: e.target.value,
          })
        }
      />
      <input
        className="sample ml-2"
        type="password"
        name=""
        id=""
        placeholder="password"
        onChange={(e) =>
          setRegister({
            ...register,
            password: e.target.value,
          })
        }
      />
      <button className="sample ml-2 p-1" onClick={registerUser}>
        sign in
      </button>

      <p>current user: {currentUser?.email}</p>
      <button className="sample ml-2 p-1" onClick={logout}>
        logout
      </button>

      <p className="mt-20">login</p>
    </div>
  );
};

export default Login;
