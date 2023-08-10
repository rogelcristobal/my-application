
import { useUser } from "@clerk/clerk-react";
import { useSelector } from "react-redux";


const Home = () => {
  const currentUser = useSelector((state) => state.currentUser.data);
  const userDataLoading = useSelector((state) => state.currentUser.loading);
  
  const {isSignedIn,user,isLoaded} = useUser()
 
  return (
    <div className="h-full overflow-y-auto  w-full flex flex-col items-start justify-start relative">
      <div className=" h-full  pt-[3.5rem] px-6 w-full">
        <div className=" w-full   h-[120%]  ">
          <div className="flex flex-col  px-6">
            <span className="text-[0.875rem] text-gray-600 font-medium">Dashboard</span>
            <span className="text-[1.5rem] mt-1.5 drop-shadow-sm font-medium">
              Welcome, <span className="capitalize">{isLoaded&&user.firstName}</span>
            </span>
          </div>        
        </div>
      </div>
    </div>
  );
};

export default Home;
