import React from "react";
import { useSelector } from "react-redux";
const Home = () => {
  
  const currentUser = useSelector((state) => state.currentUser.data);
  const userDataLoading = useSelector((state) => state.currentUser.loading);


  return (
    <div className="h-full overflow-y-auto  w-full flex flex-col items-start justify-start relative">
      <div className=" h-full  pt-[4rem] px-6 w-full">
        <div className=" w-full   h-[120%]  ">
          <div className="">
            <span className="text-[1.5rem] ml-4 drop-shadow-sm font-normal">Dashboard</span>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Home;
