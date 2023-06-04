import React from "react";
import Sidebar from "../components/Sidebar";
import AuthContext from "../context/AuthContext";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
Sidebar;
const Home = () => {
  const navigate = useNavigate()
  const {data,userLoading}  = React.useContext(AuthContext)
   const logOutUser = async () => {
    try {
      await auth.signOut();
      console.log("User signed out successfully");
      navigate('/login')
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <div className="h-full  pt-12 w-full flex flex-col items-start relative justify-start">
      <button className="fixed top-0 p-1 bg-blue-500 text-white right-0" onClick={logOutUser}>log out</button>
      <div className="h-fit w-full flex  px-12 pb-6 flex-col">
        {/* <span className="mb-3 font-medium text-[0.85rem] text-[#6360ea]">Dashboard</span> */}
        <span className="font-semibold capitalize text-[1.35rem]">Welcome, {data?.firstName}.</span>
        <span className="text-[0.775rem] font-medium  tracking-wide mt-2 text-[#808088]/70">
          Here's your data today.
        </span>
      </div>

      <div className="px-12  w-full h-[calc(100%-8rem)] ">
        <div className=" px-4 py-4 rounded-lg mt-0 cursor-pointer thin-box-divider bg-[#1e1e1e] flex flex-col h-fit w-60">
          <div className=" flex flex-col w-fit">
            <span className="text-[0.775rem] font-medium  tracking-wide text-[#757575]">
              Total notes
            </span>
            <span className=" mt-0.5  text-white font-medium text-[1.7rem] ">
              {data?.totalNotes}
            </span>
          </div>
        </div>
      </div>
      {/* content */}
    </div>
  );
};

export default Home;
