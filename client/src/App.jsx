import React from "react";
import { Routes, Navigate, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./features/user/currentUserSlice";
import Sidebar from "./components/Sidebar";
import { useUser } from "@clerk/clerk-react";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";


function App() {
  const dispatch = useDispatch();
  const { isSignedIn, user, isLoaded } = useUser();
  const currentUserLoading = useSelector((state)=>state.currentUser.loading)
  const currentUser= useSelector((state)=>state.currentUser.data)

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
  
  // if(!currentUserLoading){
  //   console.log(currentUser)
  // }else{
  //   console.log('loading')
  // }
  return (
    <div className="h-screen w-full  font-inter  bg-[#0c1015] text-[#ffffff] relative">
      <Routes>
        <Route path="/auth/*" element={<AuthPage />}></Route>
        
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="h-full   flex items-start flex-col justify-start relative">
                <div className=" flex-shrink-0 w-full flex     h-[3.85rem] fixed z-10 items-center  justify-end"></div>
                <div className="flex items-start  justify-start w-full h-full">
                  <Sidebar></Sidebar>
                  <Routes>
                    <Route
                      path="/"
                      element={<Navigate to="/dashboard" />}
                    ></Route>
                    <Route path="/dashboard" element={<Home />}></Route>
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
