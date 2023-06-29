import React from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase-config";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Login = () => {
  const navigate = useNavigate()
  const data = useSelector(state=>state.user.firebaseCurrentUser)

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

      //  request storing uid and other data to the db
      if (user) {
        await Axios.post(
          "http://localhost:3001/auth/register",
          {
            uid: user.uid,
            email: user.email,
            firstName:registerInput.firstName,
            lastName:registerInput.lastName
          }
        );
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
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  const logInUser = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        logInInput.email,
        logInInput.password
      );
      navigate('/dashboard')
      setLogInInput({ email: "", password: "" });
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <div className="h-full p-12 font-inter bg-[#17181c] text-white mx-auto ">
      <p>register</p>
      <input
        className="sample text-black "
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
        className="sample ml-2 text-black "
        type="password"
        placeholder="password"
        onChange={(e) =>
          setRegisterInput({
            ...registerInput,
            password: e.target.value,
          })
        }
      />
      <br />
      <input
        className="sample text-black "
        type="text"
        placeholder="firstname"
        onChange={(e) =>
          setRegisterInput({
            ...registerInput,
            firstName: e.target.value,
          })
        }
      />
      <input
        className="sample  ml-2 text-black "
        type="text"
        placeholder="lastname"
        onChange={(e) =>
          setRegisterInput({
            ...registerInput,
            lastName: e.target.value,
          })
        }
      />
      <button className="sample ml-2  p-1 bg-blue-500 text-white rounded-md" onClick={registerUser}>
        sign in
      </button>

      <p>current user: {data?.email}</p>
      <button className="sample ml-2  p-1 bg-red-500 text-white rounded-md" onClick={logOutUser}>
        logout
      </button>

      <p className="mt-20">login</p>
      <input
        className="sample text-black "
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
        className="sample ml-2 text-black"
        type="password"
        placeholder="password"
        onChange={(e) =>
          setLogInInput({
            ...logInInput,
            password: e.target.value,
          })
        }
      />
      <button className="sample ml-2 p-1 bg-green-500 text-white rounded-md" onClick={logInUser}>
        log in
      </button>
    </div>
  );
};

export default Login;
