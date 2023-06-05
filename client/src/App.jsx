import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import Sidebar from "./components/Sidebar";
import { NoteCollectionProvider } from "./context/NoteCollectionContext";
import AuthContext from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  const { currentUser, userLoading, data } = React.useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route
        path="/*"
        element={
          <ProtectedRoute userLoading={userLoading} currentUser={currentUser}>
            <div className="h-full w-full ">
              <div className="h-screen w-full bg-[#17181c] font-inter  text-[#ffffff] flex items-start  justify-start relative">
                <NoteCollectionProvider USER_ID="65dqzbapFHPjDMa5ICa134U6WXO2">
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
  );
}

export default App;
