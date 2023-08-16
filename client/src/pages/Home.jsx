import { useUser } from "@clerk/clerk-react";
const Home = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="h-full overflow-y-auto font-inter w-full flex flex-col items-end justify-start relative">
      <div className=" h-full  pt-[3.5rem] px-5  w-full">
        <div className=" container mx-auto   h-[150%]  ">
          <div className="flex items-center  px-6">
            <div className="flex flex-col  w-full">
              <span className="text-[0.8rem]  text-[#686868]/70  font-normal">
                <span className="capitalize ">Dashboard</span>
                <p className="text-[1.45rem] text-[#e8e8e8]  mt-1.5 font-medium capitalize">
                  {" "}
                  Welcome back, {isLoaded && user.firstName}
                </p>
              </span>
            </div>

            
          </div>
          <div className="px-5 pt-5 h-full">
            <div className=" flex gap-4 mt-3">
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
