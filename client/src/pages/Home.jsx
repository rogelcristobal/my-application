import React from "react";
import Sidebar from "../components/Sidebar";
Sidebar;
import Collections from "./Collections";
const Home = () => {
 

  return (
    <div className="h-full  pt-10 w-full flex flex-col items-start justify-start">
      <div className="h-fit w-full flex  px-10 pb-6 flex-col">
        {/* <span className="mb-3 font-medium text-[0.85rem] text-[#6360ea]">Dashboard</span> */}
        <span className="font-medium text-[1.2rem]">Welcome, Rogel Gabriel!</span>
        <span className="text-[0.775rem] font-medium  tracking-wide mt-2 text-[#808088]/70">
          Here's your data today.
        </span>
      </div>

      <div className="px-9  w-full h-[calc(100%-8rem)] ">
        <div className=" px-4 pb-3.5 pt-3.5 rounded-lg mt-0 cursor-pointer thin-box-divider bg-[#1e1e1e] flex flex-col h-fit w-60">
          <div className=" flex flex-col w-fit">
            <span className="text-[0.775rem] font-medium  tracking-wide text-[#757575]">
              Total notes
            </span>
            <span className=" mt-0.5  text-white font-helveticaRoman text-[1.7rem] ">
              52
            </span>
          </div>
        </div>
      </div>
      {/* content */}
    </div>
  );
};

export default Home;
