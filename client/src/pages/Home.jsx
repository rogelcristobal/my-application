import { useUser } from "@clerk/clerk-react";
const Home = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="h-full overflow-y-auto font-inter w-full flex flex-col items-end justify-start relative">
      <div className=" h-full  pt-[4rem] px-6  w-full">
        <div className=" container mx-auto   h-[150%]  ">
          <div className="flex items-center  px-6">
            <div className="flex flex-col  w-full">
              <span className="text-[0.8rem]  text-[#686868]  font-normal">
                <p className="text-[1.425rem] text-[#e8e8e8] mb-3  font-medium capitalize">
                  {" "}
                  Welcome, {isLoaded && user.firstName}
                </p>
                <span className="capitalize ">Dashboard</span>
              </span>
            </div>

            
          </div>
          <div className="px-6 pt-3 h-full ">
            <div className=" flex gap-4 mt-0">
              <div className="w-[14rem] h-32  rounded-md bg-[#212121]"></div>
              <div className="w-[14rem] h-32  rounded-md bg-[#212121]"></div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
