import { useUser } from "@clerk/clerk-react";
const Home = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="h-full overflow-y-auto font-inter w-full flex flex-col items-end justify-start relative">
      <div className=" h-full  pt-[4rem] px-6  w-full">
        <div className=" container mx-auto   h-[150%]  ">
          <div className="flex items-center  px-6">
            <div className="flex flex-col  w-full">
              <span className="text-[0.8rem]  capitalize text-gray-400/60 font-normal">
                  Good Morning, {isLoaded && user.firstName}
                <p className="text-[1.55rem] text-[#d4d4d4] mb-5 mt-1.5 font-medium capitalize">
                
                  Welcome back!
                </p>
              </span>
            </div>

            
          </div>
          <div className="px-6 pt-2 h-full ">
            {/* <div className=" flex gap-6 mt-0">
              <div className="w-[14rem] h-32  rounded-md view"></div>
              <div className="w-[14rem] h-32  rounded-md view"></div>
            </div> */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
