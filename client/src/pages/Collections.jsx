import React from "react";
import Sidebar from "../components/Sidebar";
const Collections = () => {
  return (
    <div className="h-full  pt-10 w-full flex flex-col items-start justify-start">
       <div className="h-fit w-full flex  px-10 pb-6 flex-col">
        {/* <span className="mb-3 font-medium text-[0.85rem] text-[#6360ea]">Dashboard</span> */}
        <span className="font-semibold text-[1.475rem]">Collection</span>
        
      </div>

      <div className="px-9  w-full h-[calc(100%-8rem)] "></div>
    </div>
  );
};

export default Collections;
