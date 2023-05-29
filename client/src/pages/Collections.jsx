import React from "react";
import Sidebar from "../components/Sidebar";
const Collections = ({data,isLoading}) => {
  return (
    <div className="h-full  pt-10 w-full flex flex-col items-start justify-start">
       <div className="h-fit w-full flex  px-10 pb-6 flex-col">
        {/* <span className="mb-3 font-medium text-[0.85rem] text-[#6360ea]">Dashboard</span> */}
        <span className="font-medium text-[1.2rem]">Collections</span>
        <span className="text-[0.775rem] font-medium  tracking-wide mt-2 text-[#808088]/70">
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
