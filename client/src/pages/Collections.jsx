import React from "react";
import Sidebar from "../components/Sidebar";
const Collections = () => {
  return (
    <div className="h-screen  w-full text-[#20304f] flex items-start  justify-start relative">
      <Sidebar></Sidebar>
      <div className="h-full  pt-10 w-full flex flex-col items-start justify-start">
        <div className="h-fit w-full flex thin-bottom-divider px-10 pb-6 flex-col">
          <span className="font-semibold text-[1.25rem]">Collections</span>
          <span className="text-xs font-normal mt-1.5 text-[#a8adb7]">
            Here's your data today.
          </span>
        </div>

        {/* content */}
      </div>
    </div>
  );
};

export default Collections;
