import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import Sidebar from "./components/Sidebar";
import { NoteCollectionProvider } from "./context/NoteCollectionContext";
import AuthContext from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { auth } from "./firebase-config";
function App() {
  const {currentUser,setCurrentUser,userLoading,setUserLoading} = React.useContext(AuthContext)
   React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        console.log("User is signed in:", user);
        // Perform actions for authenticated user
        setCurrentUser(user);
        setUserLoading(false)
      } else {
        // User is signed out
        console.log("User is signed out");
        // Perform actions for signed out user
        setCurrentUser({});
        setUserLoading(true)
      }
    });

    // Clean up the event listener when the component unmounts
    return () => unsubscribe();
  }, []);
  return (
    <>
      <span className="fixed top-0 right-0 p-2 flex flex-col bg-white z-50">{currentUser?.email}</span>
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route
        path="/*"
        element={
         <ProtectedRoute userLoading={userLoading} currentUser={currentUser}>
           <div className="h-full w-full font-plus ">
            <div className="h-screen w-full bg-[#171717] text-white flex items-start  justify-start relative">
              <NoteCollectionProvider USER_ID='QEO8pjVKkXeNjGy1LRFPCmi3UVS2'>
                <Sidebar></Sidebar>
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
                </Routes>
              </NoteCollectionProvider>
            </div>
          </div>
         </ProtectedRoute>
        }
      ></Route>
    </Routes>
    </>
  );
}

export default App;
