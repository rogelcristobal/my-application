
import { useUser } from "@clerk/clerk-react";
import { useSelector } from "react-redux";


const Home = () => {
  const currentUser = useSelector((state) => state.currentUser.data);
  const userDataLoading = useSelector((state) => state.currentUser.loading);
  
  const {isSignedIn,user,isLoaded} = useUser()
 
  return (
    <div className="h-full overflow-y-auto  w-full flex flex-col items-start justify-start relative">
      <div className=" h-full  pt-[4rem] px-6 w-full">
        <div className=" w-full   h-[120%]  ">
          <div className="flex flex-col view px-6">
            
            <span className="text-[1.6rem]  drop-shadow-sm font-medium">
              Dashboard
            </span>
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default Home;
