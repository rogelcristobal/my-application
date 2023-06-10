import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import Sidebar from "./components/Sidebar";
import { NoteCollectionProvider } from "./context/NoteCollectionContext";
import AuthContext from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Todos from "./pages/Todos";
import Blogs from "./pages/Blogs";
function App() {
  const { currentUser, userLoading, data } = React.useContext(AuthContext);
 
  return (
    <div className="h-screen w-full bg-[#17181c] font-plus  text-[#ffffff]">
      
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route
        path="/*"
        element={
          <ProtectedRoute userLoading={userLoading} currentUser={data}>
            
              <div className="h-full w-full  flex items-start  justify-start relative">
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
                    <Route
                      path="/Todos"
                      element={<Todos />}
                    ></Route>
                      <Route
                      path="/Blogs"
                      element={<Blogs />}
                    ></Route>
                    
                  </Routes>
              </div>
            
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
    
    </div>
  );
}

export default App;
