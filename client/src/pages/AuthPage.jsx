import React from "react";
import { useSignUp } from "@clerk/clerk-react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import SignInComponent from "../components/SignInComponent";
import SignUpComponent from "../components/SignUpComponent";
import { Routes, Route } from "react-router-dom";
const AuthPage = () => {
  const navigate = useNavigate();
  const [code, setCode] = React.useState(null);
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const { isLoaded, signUp, setActive } = useSignUp();

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
    <div className="w-full  h-full">
      <Routes>
        <Route
          path="/sign-in"
          element={
            <>
              {!pendingVerification && (
                <div className="flex items-center justify-end mx-auto container h-full">
                  <SignInComponent
                    setPendingVerification={setPendingVerification}
                  ></SignInComponent>
                </div>
              )}
              {pendingVerification && (
                <div className="flex items-start pt-[8rem] justify-center mx-auto container h-full">
                  <div className="view p-8 flex flex-col items-center rounded-xl w-fit h-fit justify-center">
                    input code
                    <input
                      className="   text-[#0c1015] rounded-md w-52 "
                      type="text"
                      placeholder="code"
                      onChange={(e) => setCode(e.target.value)}
                    />
                    <button onClick={(e) => onPressVerify(e)}>okay</button>
                  </div>
                </div>
              )}
            </>
          }
        ></Route>
        <Route
          path="/sign-up"
          element={
            <div className="flex items-center justify-end mx-auto container h-full">
              <SignUpComponent
                setPendingVerification={setPendingVerification}
              ></SignUpComponent>
            </div>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default AuthPage;
