// import React from "react";
// import { useSelector } from "react-redux";


const Home = () => {
  // const currentUser = useSelector((state) => state.currentUser.data);
  // const userDataLoading = useSelector((state) => state.currentUser.loading);
  
  // const {isLoaded,isSignedIn,user} = useUser()

  return (
    <div className="h-full overflow-y-auto  w-full flex flex-col items-start justify-start relative">
      <div className=" h-full  pt-[4rem] px-6 w-full">
        <div className=" w-full   h-[120%]  ">
          <div className="flex flex-col ">
            <span></span>
            <span className="text-[1.6rem] ml-6 drop-shadow-sm font-medium">
              Dashboard
            </span>
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default Home;
