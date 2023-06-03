import React from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";
import Axios from "axios";
import AuthContext from "../context/AuthContext";
const Login = () => {

  const {currentUser, setCurrentUser} = React.useContext(AuthContext);

  const [registerInput, setRegisterInput] = React.useState({
    email: "",
    password: "",
    firstName:'',
    lastName:'',
  });
  const [logInInput, setLogInInput] = React.useState({
    email: "",
    password: "",
  });

  const registerUser = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        registerInput.email,
        registerInput.password
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
        logOutUser();
      }

      setRegisterInput({ email: "", password: "" });
    } catch (error) {
      console.log(error.message);
    }
  };

  const logOutUser = async () => {
    try {
      await auth.signOut();
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  const logInUser = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        logInInput.email,
        logInInput.password
      );
      console.log(user);
      setLogInInput({ email: "", password: "" });
    } catch (error) {
      console.log(error.message);
    }
  };


  console.log('onAuth',currentUser?.email)
  return (
    <div className="h-full">
      <p>register</p>
      <input
        className="sample"
        type="text"
        placeholder="email"
        onChange={(e) =>
          setRegisterInput({
            ...registerInput,
            email: e.target.value,
          })
        }
      />
      <input
        className="sample ml-2"
        type="password"
        placeholder="password"
        onChange={(e) =>
          setRegisterInput({
            ...registerInput,
            password: e.target.value,
          })
        }
      />
      <button className="sample ml-2 p-1" onClick={registerUser}>
        sign in
      </button>

      <p>current user: {currentUser?.email}</p>
      <button className="sample ml-2 p-1" onClick={logOutUser}>
        logout
      </button>

      <p className="mt-20">login</p>
      <input
        className="sample"
        type="text"
        placeholder="email"
        onChange={(e) =>
          setLogInInput({
            ...logInInput,
            email: e.target.value,
          })
        }
      />
      <input
        className="sample ml-2"
        type="password"
        placeholder="password"
        onChange={(e) =>
          setLogInInput({
            ...logInInput,
            password: e.target.value,
          })
        }
      />
      <button className="sample ml-2 p-1" onClick={logInUser}>
        log in
      </button>
    </div>
  );
};

export default Login;
