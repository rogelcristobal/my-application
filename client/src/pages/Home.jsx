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
      {/* <div className="w-full flex-shrink-0  pt-6 flex items-center justify-between px-8 py-3 ">
        <SearchBar />
        <div
          className={`bg-[#1e1f23] grid cursor-pointer  rounded-full h-10 w-10 place-content-center 
            `}
        >
          <span className="uppercase text-[0.9rem]">{data?.firstName.split("")[0]}</span>
        </div>
      </div> */}
       <div className="h-fit  w-full flex pt-9 px-9 pb-4 flex-col">
        

        
        {/* can be nested route? */}
        <span className=" mt-2 text-[1.45rem] font-medium  capitalize">Welcome,<span className="text-semibold "> {data?.firstName} {data?.lastName}. </span></span>
 
      </div>

      <div className="px-9 w-full  h-full pt-4">
        {/* text-[#a7a9ad]/80 */}
        <span className="mt-6 font-medium font-inter text-[0.775rem] text-[#a7a9ad]/80  ">Dashboard</span>
        <div className=" px-0 thin-box-divider drop-shadow  rounded-lg mt-3 cursor-pointer  flex flex-col justify-start min-h-[6rem] w-60">
          <div className=" flex  flex-col px-4 py-3 w-full">
            <span className="text-[0.785rem] flex items-center gap-2  font-medium ">
              Total notes <LuHelpCircle />
            </span>
          </div>
            <span className="px-4 pt-0 pb-2   text-inherit font-helveticaRegular text-[1.8rem] ">
              32
            </span>
        </div>
        <div className="mt-6">
          <span className="text-[0.775rem] mb-3    text-[#a7a9ad]/80 font-medium font-inter ">Recently added </span>
        </div>
        
      </div>
      {/* content */}
    </div>
  );
};

export default Home;
