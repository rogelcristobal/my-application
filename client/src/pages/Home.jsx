import React from "react";
import Sidebar from "../components/Sidebar";
import AuthContext from "../context/AuthContext";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import {LuHelpCircle} from 'react-icons/lu'
import SearchBar from "../components/SearchBar";
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
    <div className="h-full   w-full flex flex-col items-start justify-start relative">
      <div className="w-full flex-shrink-0  pt-6 flex items-center justify-between px-8 py-3 ">
        <SearchBar />
        <div
          className={`bg-[#1e1f23] grid cursor-pointer  rounded-full h-10 w-10 place-content-center 
            `}
        >
          <span className="uppercase text-[0.9rem]">{data?.firstName.split("")[0]}</span>
        </div>
      </div>
       <div className="h-fit  w-full flex pt-2 px-9 pb-0 flex-col">
        

        
        {/* can be nested route? */}
        <span className="font-plus mt-2 text-[1.4rem] font-medium tracking-tight capitalize">Welcome,<span className="text-semibold  tracking-tight"> {data?.firstName} {data?.lastName}. </span></span>
        <span className="mt-6 font-semediummibold text-[0.8rem]  text-[#a7a9ad]/70">Dashboard</span>
        {/* <span className="text-[0.8rem] font-plus text-black mt-3 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, eos?
        </span> */}
      </div>

      <div className="px-8 w-full h-full pt-4">
        {/* <div className=" border-dark-top mb-6"></div> */}
        <div className=" px-0 bg-[#1e1f23]  rounded-md mt-0 cursor-pointer  flex flex-col justify-start min-h-[6rem] w-60">
          <div className=" flex  flex-col px-4 py-3 w-full">
            <span className="text-[0.785rem] flex items-center gap-2 font-plus font-medium text-[#97999e]">
              Total notes <LuHelpCircle />
            </span>
          </div>
            <span className="px-4 pt-0 pb-2   text-inherit font-helveticaRegular text-[1.8rem] ">
              32
            </span>
        </div>
        <div className="mt-6">
          <span className="text-[0.775rem] mb-3  text-[#a7a9ad]/70   font-medium ">Recently added </span>
        </div>
      </div>
      {/* content */}
    </div>
  );
};

export default Home;
