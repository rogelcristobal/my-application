import { useUser } from "@clerk/clerk-react";
const Home = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="h-full overflow-y-auto  font-inter w-full flex flex-col items-end justify-start relative">
      <div className=" h-full  pt-[3.5rem]  w-full">
        <div className=" container mx-auto   h-[150%]  ">
          <div className="flex items-center  view px-0">
            <div className="flex flex-col items-start mb-6 w-full">
              <span className="text-[0.875rem] text-start capitalize text-[#7f858c]/80 font-medium">
                Goodmorning
                <p className="text-[1.5rem]  text-black mt-1   ">
                  Welcome back, <span className="text-[#4285F4]">{isLoaded && user.firstName}</span>
                </p>
              </span>
            </div>
          </div>
          <div className="px-6 pt-0  w-full h-full ">
            <div className=" flex gap-6 "></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
