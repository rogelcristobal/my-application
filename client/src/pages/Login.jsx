import React from "react";

import Axios from "axios";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'
import { useSignUp } from "@clerk/clerk-react";
const Login = () => {
  const navigate = useNavigate();
  // const data = useSelector((state) => state.user.firebaseCurrentUser);

  const [registerInput, setRegisterInput] = React.useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [code, setCode] = React.useState(null);

  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = React.useState(false);

  const registerUser = async (e) => {
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

  // verify code input
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
        await Axios.post("http://localhost:3001/auth/register", {
          uid: completeSignUp.createdUserId,
          email: completeSignUp.emailAddress,
          firstName: completeSignUp.firstName,
          lastName: completeSignUp.lastName,
        });

        await setActive({ session: completeSignUp.createdSessionId });
        navigate("/");
      }

      if (completeSignUp.status !== "complete") {
        alert("wrong code boi");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-end mx-auto container h-full">
      {!pendingVerification && (
        <div className="h-fit rounded-xl view w-fit shadow-lg bg-white text-[#0c1015] p-7 flex flex-col font-inter justify-center items-center space-y-3.5 bg-inherit  ">
         <div className=" flex flex-col w-full pt-2 pb-6">
           <p className="text-inherit  text-[1.125rem] font-medium">Create your Account</p>
           <p className="text-gray-500/70 text-[0.75rem] mt-1.5 font-medium">to continue to NoteStack</p>
         </div>

          <div className="flex  gap-4">
            <div className="flex flex-col ">
              <label className="text-gray-500/70 text-[0.75rem] mb-1.5 font-medium">
                First name
              </label>
              <input
                className=" text-[#0c1015] rounded-md w-[8.85rem] bg-white view py-1.5 px-2 placeholder:text-[0.9rem]"
                type="text"
                onChange={(e) =>
                  setRegisterInput({
                    ...registerInput,
                    firstName: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col ">
              <label className="text-gray-500/70 text-[0.75rem] mb-1.5 font-medium">
                Last name
              </label>
              <input
                className=" text-[#0c1015] rounded-md w-[8.85rem] bg-white view py-1.5 px-2 placeholder:text-[0.9rem]"
                type="text"
                onChange={(e) =>
                  setRegisterInput({
                    ...registerInput,
                    lastName: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="flex flex-col w-full ">
            <label className="text-gray-500/70 text-[0.75rem] mb-1.5 font-medium">
              Email
            </label>
            <input
              className=" text-[#0c1015] rounded-md w-full bg-white view py-1.5 px-2 placeholder:text-[0.9rem]"
              type="text"
              onChange={(e) =>
                setRegisterInput({
                  ...registerInput,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col w-full ">
            <label className="text-gray-500/70 text-[0.75rem] mb-1.5 font-medium">
              Password
            </label>
            <input
              className="  text-[#0c1015] rounded-md w-full bg-white view py-1.5 px-2 placeholder:text-[0.9rem]"
              type="password"
              onChange={(e) =>
                setRegisterInput({
                  ...registerInput,
                  password: e.target.value,
                })
              }
            />
          </div>

          <button
            className="  w-full px-2 py-3 bg-[#1b55ff] text-[0.75rem] font-medium text-white rounded-md"
            onClick={registerUser}
          >
            CONTINUE
          </button>

              <span className="text-gray-500/70 text-[0.75rem] w-full text-center pt-4 font-medium">have an account? <Link to='/' className="text-[#1b55ff]">Sign in</Link></span>
              
        </div>
      )}
      {pendingVerification && (
        <div className="view p-8 flex flex-col items-center justify-center">
          input code
          <input
            className="   text-[#0c1015] rounded-md w-52 "
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
