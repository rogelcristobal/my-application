import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import Todos from "./pages/Todos";
import Blogs from "./pages/Blogs";
import { auth } from "./firebase-config";
import {
  updateFirebaseCurrentUserIsLoading,
  updateFirebaseCurrentUser,
} from "./features/user/firebaseCurrentUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./features/user/currentUserSlice";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const firebaseCurrentUser = useSelector(
    (state) => state.user.firebaseCurrentUser
  );
  const firebaseCurrentUserIsLoading = useSelector(
    (state) => state.user.firebaseCurrentUserIsLoading
  );
  const currentUser = useSelector((state) => state.currentUser.data);
  const userDataLoading = useSelector((state) => state.currentUser.loading);



//  if(!userDataLoading) console.log(currentUser)
  // debug purpose
 
  const logOutUser = async () => {
    try {
      await auth.signOut();
      console.log("User signed out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // this is for storing firebase user credential to the state
  React.useEffect(() => {
    dispatch(updateFirebaseCurrentUserIsLoading(true));
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const transformedUserData = {
          uid: user.uid,
          email: user.email,
          createdAt: user.metadata.creationTime,
          lastLoginTime: user.metadata.lastSignInTime,
          provider: user.providerId,
          emailVerified: user.emailVerified,
        };
        dispatch(updateFirebaseCurrentUser(transformedUserData));
      } else {
        dispatch(updateFirebaseCurrentUser(null));
      }
      // Set loading state to false once authentication state is determined
      dispatch(updateFirebaseCurrentUserIsLoading(false));
    });
    return () => unsubscribe();
  }, []);


  // this stores the currentUser that will be used in entire app
  //  via firebase uid(which is its only purpose)
  React.useEffect(() => {

    
    if (!firebaseCurrentUserIsLoading) {
      dispatch(fetchUser(firebaseCurrentUser?.uid));
    }
  
  }, [dispatch, firebaseCurrentUser?.uid]);

  return (
    <div className="h-screen w-full bg-[#171717] font-inter text-[#979797] text-[0.9rem] relative">
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="h-full   flex items-start  justify-start relative">
                {/* sidebar */}
                <Sidebar></Sidebar>
                <div className="flex items-start  flex-col justify-start w-full  h-screen">
                  {/* navigation */}
                  <div className="h-fit w-full flex border-dark-bottom view  px-10   pt-6 pb-3  items-center  justify-between">
                    <div className="view  flex flex-col">
                     
                      {/* <span className=" capitalize ">
                        {userDataLoading ? (
                          <span>loading</span>
                        ) : (
                          <span>Welcome back, <span className="">{currentUser?.firstName} {currentUser?.lastName}.</span> </span>
                        )}
                      </span>
                      <span className="text-[0.8rem] mt-1 font-medium ">
                        {userDataLoading ? (
                          <span >loading</span>
                        ) : (
                          currentUser?.email
                        )}
                      </span> */}
                    </div>
                    <button onClick={logOutUser} className="view text-sm p-1">
                      logout
                    </button>
                  </div>
                  <Routes>
                    <Route
                      path="/"
                      element={<Navigate to="/dashboard" />}
                    ></Route>
                    <Route path="/dashboard" element={<Home />} />
                    <Route
                      path="/collections"
                      element={<Collections />}
                    ></Route>
                    <Route path="/Todos" element={<Todos />}></Route>
                    <Route path="/Blogs" element={<Blogs />}></Route>
                  </Routes>
                </div>
              </div>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
