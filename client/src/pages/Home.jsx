import { useUser } from "@clerk/clerk-react";
const Home = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="h-full overflow-y-auto font-inter w-full flex flex-col items-end justify-start relative">
      <div className=" h-full  pt-[4rem] px-8  w-full">
        <div className=" container mx-auto   h-[150%]  ">
          <div className="flex items-center   px-6">
            <div className="flex flex-col items-start w-full">
              <span className="text-[0.8rem] text-start capitalize text-gray-400/60 font-normal">
                  {/* Good Morning, {isLoaded && user.firstName}
                   */}
                   Monday, August 21
                <p className="text-[1.5rem] text-[#d4d4d4] mb-5 mt-2 font-medium capitalize">
                
                  {/* Welcome back! */}
                   Good Morning, {isLoaded && user.firstName}
                </p>
              </span>
              <span className="text-gray-400/60 text-[0.8rem] mt-2.5">You timed in at 6:00 am today</span>
            </div>

            
          </div>
          <div className="px-6 pt-6 w-full h-full ">
             <div className=" flex gap-6 mt-0">
              <div className="w-[14rem] h-28  rounded-md  bg-[#191b1e]">
                <div>
                  <span></span>
                </div>
              </div>
              <div className="w-[14rem] h-28  rounded-md  bg-[#191b1e]"></div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
