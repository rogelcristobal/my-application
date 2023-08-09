import React from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase-config";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSignUp, UserButton, useUser } from "@clerk/clerk-react";
const Login = () => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.user.firebaseCurrentUser);
  const [logInInput, setLogInInput] = React.useState({
    email: "",
    password: "",
  });

  const [registerInput, setRegisterInput] = React.useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [code, setCode] = React.useState(null);

  const { isLoaded, signUp, setActive } = useSignUp();
  const { user, isSignedIn, isLoaded: userLoaded } = useUser();
  const [pendingVerification, setPendingVerification] = React.useState(false);

  const registerUser = async (e) => {
    // try {
    //   const { user } = await createUserWithEmailAndPassword(
    //     auth,
    //     registerInput.email,
    //     registerInput.password
    //   );

    //   //  request storing uid and other data to the db
    //   if (user) {
    //     console.log(user)
    //     await Axios.post(
    //       "http://localhost:3001/auth/register",
    //       {
    //         uid: user.uid,
    //         email: user.email,
    //         firstName:registerInput.firstName,
    //         lastName:registerInput.lastName,
    //         createdAt: user.metadata.creationTime,
    //         lastLoginTime: user.metadata.lastSignInTime,
    //         provider: user.providerId,
    //         emailVerified: user.emailVerified,
    //       }
    //       );
    //     logOutUser();
    //   }

    //   setRegisterInput({ email: "", password: "" });
    // } catch (error) {
    //   console.log(error.message);
    // }

    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: registerInput.email,
        password: registerInput.password,
        firstName: registerInput.firstName,
        lastName: registerInput.lastName,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  };

  const onPressVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        // await Axios.post(
        // "http://localhost:3001/auth/register",
        // {
        //   uid: completeSignUp.createdUserId,
        //   email: completeSignUp.emailAddress,
        // }
        // );
        if(!userLoaded){
          console.log('loading')
        }
        if(isSignedIn){
          console.log(user)
        }

        await setActive({ session: completeSignUp.createdSessionId });
      }

      if (completeSignUp.status !== "complete") {
        alert("wrong code boi");
      }
    } catch (error) {}
  };

  return (
    <div className="flex items-center justify-center h-full">
      {!pendingVerification && (
        <div className="h-fit rounded-lg view w-fit p-8 flex flex-col font-inter justify-start items-start space-y-3 bg-inherit  ">
          <p>register</p>
          <input
            className=" text-black w-52 "
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
            className="  text-black w-52 "
            type="password"
            placeholder="password"
            onChange={(e) =>
              setRegisterInput({
                ...registerInput,
                password: e.target.value,
              })
            }
          />
          <input
            className=" text-black w-52 "
            type="text"
            placeholder="firstName"
            onChange={(e) =>
              setRegisterInput({
                ...registerInput,
                firstName: e.target.value,
              })
            }
          />
          <input
            className=" text-black w-52 "
            type="text"
            placeholder="lastName"
            onChange={(e) =>
              setRegisterInput({
                ...registerInput,
                lastName: e.target.value,
              })
            }
          />

          <button
            className=" ml-2  p-1 bg-blue-500 text-white rounded-md"
            onClick={registerUser}
          >
            sign in
          </button>

          <UserButton />
        </div>
      )}
      {pendingVerification && (
        <div className="view p-8 flex flex-col items-center justify-center">
          input code
          <input
            className="   text-black w-52 "
            type="text"
            placeholder="code"
            onChange={(e) => setCode(e.target.value)}
          />
          <button onClick={(e) => onPressVerify(e)}>okay</button>
        </div>
      )}
    </div>
  );
};

export default Login;
