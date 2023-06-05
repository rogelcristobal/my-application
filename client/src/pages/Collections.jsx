import React from "react";
import Sidebar from "../components/Sidebar";
const Collections = ({data,isLoading}) => {
  return (
    <div className="h-full  pt-9 w-full flex flex-col items-start justify-start">
      <div className="h-fit w-full flex  px-9 pb-3 flex-col">
        {/* <span className="mb-3 font-medium text-[0.85rem] text-[#6360ea]">Dashboard</span> */}
        <span className="font-inter text-[1.40rem] ">Your collections</span>
        <span className="text-[0.75rem] font-inter text-[#77787f] mt-4 ">
          Access your saved notes here.
        </span>
      </div>
      <div className="px-9  w-full h-full ">
        {/* {!isLoading&& data?.data.map((item,id)=>(
          <span>{item.collectionTitle}</span>
        ))} */}
        
      </div>
    </div>
  );
};

export default Collections;
