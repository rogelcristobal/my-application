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
import { NoteCollectionDropDownPositionProvider } from "./context/NoteCollectionDropDownPositionContext";

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
    <div className="h-screen w-full  font-inter  bg-[#0c1015] text-[#ffffff] relative">
      <Routes>
        <Route path="/login" element={<Login />}></Route>
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
                    <Route path="/dashboard" element={<Home />} />
                    <Route
                      path="/collections/*"
                      element={
                        <NoteCollectionDropDownPositionProvider>
                          <Collections />
                        </NoteCollectionDropDownPositionProvider>
                      }
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
