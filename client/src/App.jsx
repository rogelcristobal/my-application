import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import { NoteCollectionProvider } from "./context/NoteCollectionContext";
function App() {
  return (
    <div className="h-full w-full font-plus ">
      <NoteCollectionProvider>
        <Router>
          <Routes>
            <Route path="/*" element={<Login />} />
            <Route path="/dashboard/*" element={<Home />}></Route>
            <Route path="/collection" element={<Collections />} />
          </Routes>
        </Router>
      </NoteCollectionProvider>
    </div>
  );
}

export default App;
