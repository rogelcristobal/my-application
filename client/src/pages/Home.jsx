
import { useUser,UserButton } from "@clerk/clerk-react";


const Home = () => {
  
  const {user,isLoaded} = useUser()
 
  return (
    <div className="h-full overflow-y-auto  w-full flex flex-col items-start justify-start relative">
      <div className=" h-full  pt-[3.5rem] px-6 w-full">
        <div className=" w-full   h-[120%]  ">
          <div className="flex flex-col  px-4">
            <span className="text-[0.875rem] text-gray-600 font-medium">Dashboard</span>
            <span className="text-[1.475rem] mt-1.5 drop-shadow-sm font-medium">
              Welcome, <span className="capitalize">{isLoaded&&user.firstName}</span>
            </span>
          </div>      
          <UserButton></UserButton>  
        </div>
      </div>
    </div>
  );
};

export default Home;
