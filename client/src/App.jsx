import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import Sidebar from "./components/Sidebar";
import { NoteCollectionProvider } from "./context/NoteCollectionContext";
function App() {
 
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route
        path="/*"
        element={
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
        }
      ></Route>
    </Routes>
  );
}

export default App;
