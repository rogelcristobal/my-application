import React from "react";
import Sidebar from "../components/Sidebar";
const Collections = ({data,isLoading}) => {
  return (
    <div className="h-full   w-full flex flex-col items-start justify-start">
      <div className="h-fit  w-full flex pt-6 px-9 pb-0 flex-col">
        <span className="mb-1.5 font-semibold text-[0.8rem] text-[#3b84fb]">Collections</span>
        <span className="font-plus text-[1.325rem] font-medium  capitalize"><span className="text-semibold  ">  </span></span>
        {/* <span className="text-[0.8rem] font-plus text-black mt-3 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, eos?
        </span> */}
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
