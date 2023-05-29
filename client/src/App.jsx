import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import Sidebar from "./components/Sidebar";
import Axios from "axios";
import { useQuery } from "@tanstack/react-query";

function App() {
  const fetchNotes = async (value) => {
    try {
      const response = await Axios.get(
        `http://localhost:3001/notes/user/${value}`
      );
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  };
  const { data, isLoading } = useQuery(["notes"], () =>
    fetchNotes("64696464da5bb77ea10861ac")
  );
  return (
    <div className="h-full w-full font-plus ">
      <div className="h-screen w-full bg-[#171717] text-white flex items-start  justify-start relative">
        <Sidebar data={data} loading={isLoading}></Sidebar>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/collection" element={<Collections />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
