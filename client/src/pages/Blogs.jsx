import React from "react";
import SearchBar from "../components/SearchBar";
import AuthContext from "../context/AuthContext";
const Blogs = () => {
  const { data, userLoading } = React.useContext(AuthContext);
  // if(!userLoading){
  //   console.log()
  // }
  return (
    <div className="h-full   w-full flex flex-col items-start justify-start">
      <div className="w-full flex-shrink-0  pt-8 flex items-center justify-between px-10 py-3 ">
        <SearchBar />
        <div
          className={`border-dark grid cursor-pointer  rounded-full h-10 w-10 place-content-center 
            `}
        >
          <span className="uppercase text-[0.9rem]">{data?.firstName.split("")[0]}</span>
        </div>
      </div>
      <div className="h-fit  w-full flex pt-2 px-10 pb-0 flex-col">


        {/* can be nested route? */}
        <span className="mb-4 font-semediummibold text-[0.8rem]  text-[#a7a9ad]/70">Blogs</span>
        <span className="font-plus text-[1.325rem] font-medium  capitalize">
          <span className="text-semibold  "> </span>
        </span>
        {/* <span className="text-[0.8rem] font-plus text-black mt-3 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, eos?
        </span> */}
      </div>
      <div className="px-  w-full h-full ">
        {/* {!isLoading&& data?.data.map((item,id)=>(
          <span>{item.collectionTitle}</span>
        ))} */}
      </div>
    </div>
  );
};

export default Blogs;
