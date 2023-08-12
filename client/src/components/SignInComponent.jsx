import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "@clerk/clerk-react";
import Proptypes from "prop-types";
const SignInComponent = () => {
  // const data = useSelector((state) => state.user.firebaseCurrentUser);
  const navigate = useNavigate();
  const [loginInput, setLoginInput] = React.useState({
    email: "",
    password: "",
  });

  const { isLoaded, signIn, setActive } = useSignIn();

  const registerUser = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: loginInput.email,
        password: loginInput.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/");
      }else{
        console.log(result)
      }

      // change the UI to our pending section.
   } catch (err) {
  console.error("error", err.errors[0].longMessage);
}
  };
  
  return (
    <div  className="h-fit rounded-xl view w-fit shadow-lg bg-white text-[#0c1015] p-7 flex flex-col font-inter justify-center items-center space-y-3.5 bg-inherit  ">
      <div className=" flex flex-col w-full pt-2 pb-6">
        <p className="text-inherit  text-[1.165rem] font-medium">
          Log in to your Account
        </p>
        <p className="text-gray-500/70 text-[0.75rem] mt-1.5 font-medium">
          to continue to NoteStack
        </p>
      </div>

      <div className="flex flex-col w-full ">
        <label className="text-gray-500/70 text-[0.75rem] mb-1.5 font-medium">
          Email
        </label>
        <input
          className=" text-[#0c1015] rounded-md w-[18.7rem] bg-white view py-2 px-2 focus:outline-none focus:ring-[1.5px] focus:ring-[#3399FF] text-[0.8rem]"
          type="text"
          onChange={(e) =>
            setLoginInput({
              ...loginInput,
              email: e.target.value,
            })
          }
        />
      </div>
      <div className="flex flex-col w-full pb-4">
        <label className="text-gray-500/70 text-[0.75rem] mb-1.5 font-medium">
          Password
        </label>
        <input
          className="  text-[#0c1015] rounded-md w-[18.7rem] bg-white view py-2 px-2 focus:outline-none focus:ring-[1.5px] focus:ring-[#3399FF] text-[0.8rem]"
          type="password"
          onChange={(e) =>
            setLoginInput({
              ...loginInput,
              password: e.target.value,
            })
          }
        />
      </div>

      <button
        className="  w-full px-2 py-3  bg-[#3399FF] text-[0.75rem] font-medium text-white rounded-md"
        onClick={registerUser}
      >
        CONTINUE
      </button>

      <span className="text-gray-500/70 text-[0.75rem] w-full text-center pt-4 font-medium">
        have an account?
        <Link to="/auth/sign-up" className="text-[#3399FF] ml-2">
          Sign up
        </Link>
      </span>
      <span className="text-gray-500/50 text-[0.75rem] w-full text-center pt-4 font-medium">
        Secured by <Link to="/"> clerk</Link>
      </span>
    </div>
  );
};

SignInComponent.propTypes = {
  setPendingVerification: Proptypes.func,
};

export default SignInComponent;
