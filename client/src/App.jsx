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
import Notes from "./pages/Notes";
import Todos from "./pages/Todos";
import Channels from "./pages/Channels";
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
    <div className="h-screen w-full  font-satoshi bg-white text-[#1b1b1b] .text-[#eeeeee] tracking-tight relative">
      <Routes>
        <Route path="/auth/*" element={<AuthPage />}></Route>

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="h-full   flex items-start flex-col justify-start relative">
                <div className=" flex-shrink-0 items-center top-[0rem] right-0 justify-end flex    h-[3.5rem] fixed  z-50  view .bg-[#323232]/70  w-full ">
                  <div className=" h-full  box-border w-[calc(100%-17rem)] px-12  items-center justify-end flex">
                    <div className="items-center h-full justify-end flex ">
                      <div className="w-fit h-full  justify-between  flex-shrink-0 flex gap-4 items-center"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-12 justify-start w-full h-full">
                  <Sidebar></Sidebar>
                  <div className="m-0 h-full  w-full p-0 pt-[2rem]">
                    <Routes>
                      <Route
                        path="/"
                        element={<Navigate to="/dashboard" />}
                      ></Route>
                      <Route path="/dashboard" element={<Home />}></Route>
                      <Route
                        path="/collections/*"
                        element={<Collections />}
                      ></Route>
                      <Route
                        path="/collections/notes/*"
                        element={<Notes />}
                      ></Route>
                      <Route
                        path="/collections/todos/*"
                        element={<Todos />}
                      ></Route>
                      <Route path="/channels" element={<Channels />}></Route>
                      <Route path="/settings" element={<Settings />}></Route>
                    </Routes>
                  </div>
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
