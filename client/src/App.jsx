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
  const { data,loading } = React.useContext(AuthContext);
  if (loading) {
    console.log('loading');
  }else if(!data){
    console.log('user logged out')
  }else{
    console.log(data)
  }
  return (
    <div className="h-screen w-full bg-white font-inter  text-[#0f172a]">
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/*"
          element={
              <div className="h-full w-full bg-slate-100/50  flex items-start  justify-start relative">
                <Sidebar></Sidebar>
                <Routes>
                  <Route
                    path="/"
                    element={<Navigate to="/dashboard" />}
                  ></Route>
                  <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                  <Route path="/collections" element={<Collections />}></Route>
                  <Route path="/Todos" element={<Todos />}></Route>
                  <Route path="/Blogs" element={<Blogs />}></Route>
                </Routes>
              </div>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
