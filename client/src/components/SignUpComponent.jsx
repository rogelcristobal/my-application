import React from "react";

import { Link } from "react-router-dom";
import { useSignUp } from "@clerk/clerk-react";
import Proptypes from "prop-types";
const SignUpComponent = ({ setPendingVerification }) => {
  // const data = useSelector((state) => state.user.firebaseCurrentUser);

  const [registerInput, setRegisterInput] = React.useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const { isLoaded, signUp } = useSignUp();
  // const { isLoaded: signInLoaded, signIn } = useSignIn();
  // const [pendingVerification, setPendingVerification] = React.useState(false);

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
      console.log(error);
    }
  };

  // verify code input

  // if (!signInLoaded) {
  //   console.log("sign in loading");
  // } else {
  //   console.log(signIn.status);
  // }

  return (
    <div className="h-fit rounded-xl view w-fit shadow-lg bg-white text-[#0c1015] p-7 flex flex-col font-inter justify-center items-center space-y-3.5 bg-inherit  ">
      <div className=" flex flex-col w-full pt-2 pb-6">
        <p className="text-inherit  text-[1.165rem] font-medium">
          Create your Account
        </p>
        <p className="text-gray-500/70 text-[0.75rem] mt-1.5 font-medium">
          to continue to NoteStack
        </p>
      </div>

      <div className="flex  gap-4">
        <div className="flex flex-col ">
          <label className="text-gray-500/70 text-[0.75rem] mb-1.5 font-medium">
            First name
          </label>
          <input
            className=" text-[#0c1015] rounded-md w-[8.85rem] bg-white view py-2 px-2 focus:outline-none focus:ring-[1.5px] focus:ring-[#3399FF] text-[0.8rem]"
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
            className=" text-[#0c1015] rounded-md w-[8.85rem] bg-white view py-2 px-2 focus:outline-none focus:ring-[1.5px] focus:ring-[#3399FF] text-[0.8rem]"
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
          className=" text-[#0c1015] rounded-md w-full bg-white view py-2 px-2 focus:outline-none focus:ring-[1.5px] focus:ring-[#3399FF] text-[0.8rem]"
          type="text"
          onChange={(e) =>
            setRegisterInput({
              ...registerInput,
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
          className="  text-[#0c1015] rounded-md w-full bg-white view py-2 px-2 focus:outline-none focus:ring-[1.5px] focus:ring-[#3399FF] text-[0.8rem]"
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
        className="  w-full px-2 py-3  bg-[#3399FF] text-[0.75rem] font-medium text-white rounded-md"
        onClick={registerUser}
      >
        CONTINUE
      </button>

      <span className="text-gray-500/70 text-[0.75rem] w-full text-center  pt-4 font-medium">
        have an account?
        <Link to="/auth/sign-in" className="text-[#3399FF] ml-2">
          Sign in
        </Link>
      </span>
      <span className="text-gray-500/50 text-[0.75rem] w-full text-center pt-4 font-medium">
        Secured by <Link to="/"> clerk</Link>
      </span>
    </div>
  );
};

SignUpComponent.propTypes = {
  setPendingVerification: Proptypes.func,
};

export default SignUpComponent;
