import React from "react";
import { Routes, Navigate, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Collections from "./pages/Collections";
import { useDispatch } from "react-redux";
import { fetchUser } from "./features/user/currentUserSlice";
import Sidebar from "./components/Sidebar";
import { useUser } from "@clerk/clerk-react";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import User from "./components/User";
import Settings from "./pages/Settings";
function App() {
  const dispatch = useDispatch();
  const { isSignedIn, user, isLoaded } = useUser();

  //once this app component mounts it gets the users data from DB and saves it to redux state
  React.useEffect(() => {
    if (isSignedIn) {
      dispatch(fetchUser(user.id));
    }
  }, [dispatch, isSignedIn]);

  // getting time
  // if(isLoaded){
  //   const formattedCreatedAt = new Date(user.createdAt).toLocaleString()
  //   console.log(formattedCreatedAt)
  // }
  // console.log(userDataLoading);


  return (
    <div className="h-screen w-full  font-inter  bg-[#161819] text-[#d4d4d4] relative">
      <Routes>
        <Route path="/auth/*" element={<AuthPage />}></Route>

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="h-full   flex items-start flex-col justify-start relative">
                <div className=" flex-shrink-0 items-center top-[0rem] right-0 justify-end flex    h-[3.5rem] fixed  z-50     w-full ">
                  <div className=" h-full  box-border w-[calc(100%-17rem)] px-12 items-center justify-end flex">
                    {/* <PiMagnifyingGlass className="text-[#b7b7b7]/50 text-[1.1rem]" /> */}
                  <div className="items-center h-full justify-end flex ">
                    <div className="w-fit h-full  justify-between  flex-shrink-0 flex gap-4 items-center">
                      {/* <User></User> */}
                      {/* <span className="text-[0.75rem] tracking-wide text-[#e8e8e8] capitalize">
                        {isLoaded && user?.fullName}
                      </span> */}
                    </div>
                  </div>
                  </div>
                </div>
                <div className="flex items-start  justify-start w-full h-full">
                  <Sidebar></Sidebar>
                  <Routes>
                    <Route
                      path="/"
                      element={<Navigate to="/home" />}
                    ></Route>
                    <Route path="/home" element={<Home />}></Route>
                    <Route
                      path="/collections/*"
                      element={<Collections />}
                    ></Route>
                    <Route path="/settings" element={<Settings/>}></Route>
                  </Routes>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
