import React from "react";
import SearchBar from "../components/SearchBar";
const Collections = ({data,isLoading}) => {
  return (
    <div className="h-full   w-full flex flex-col items-start justify-start">
      <div className="w-full flex-shrink-0  flex items-center justify-start px-8 focus: py-4 border-dark-bottom">
       
         <SearchBar/>
      

      </div>
      <div className="h-fit  w-full flex pt-8 px-8 pb-0 flex-col">
        
        <span className="mb-3 font-semibold text-[0.8rem] text-[#a7a9ad]/70">Collections</span>
        <span className="font-plus text-[1.325rem] font-medium  capitalize"><span className="text-semibold  ">  </span></span>
        {/* <span className="text-[0.8rem] font-plus text-black mt-3 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, eos?
        </span> */}
      </div>
      <div className="px-7  w-full h-full ">
        {/* {!isLoading&& data?.data.map((item,id)=>(
          <span>{item.collectionTitle}</span>
        ))} */}
        
      </div>
    </div>
  );
};

export default Collections;
