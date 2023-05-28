import React from "react";
import Sidebar from "../components/Sidebar";
Sidebar;
import { Routes, Route } from "react-router-dom";
import Collections from "./Collections";
const Home = () => {
  return (
    <div className="h-screen  w-full text-[#20304f] flex items-start  justify-start relative">
      <Sidebar></Sidebar>
      <Routes>
        <Route
        index
          element={
            <div className="h-full  pt-10 w-full flex flex-col items-start justify-start">
              <div className="h-fit w-full flex thin-bottom-divider px-10 pb-6 flex-col">
                <span className="font-semibold text-[1.25rem]">
                  Good Morning, Admin!
                </span>
                <span className="text-xs font-normal mt-1.5 text-[#a8adb7]">
                  Here's your data today.
                </span>
              </div>

              <div></div>

              <div className="px-5  w-full h-[calc(100%-8rem)] ">
                <div className="thin-box-divider px-5 pb-5 pt-3 rounded-lg mt-6 cursor-pointer hover:sample bg-white flex flex-col h-fit w-60">
                  <div className=" flex flex-col w-fit">
                    <span className="text-[0.775rem] font-normal text-[#a4a8c3]">
                      Total notes
                    </span>
                    <span className="text-bold mt-0.5 tracking-tighter text-[1.8rem] slashed-zero">
                      52
                    </span>
                  </div>
                </div>
              </div>
              {/* content */}
            </div>
          }
        />
        <Route path="/collection" element={<Collections />} />
      </Routes>
    </div>
  );
};

export default Home;
