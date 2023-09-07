import { useUser } from "@clerk/clerk-react";
import { PiCheckSquareOffsetBold, PiClockBold } from "react-icons/pi";
const Home = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="h-full overflow-y-auto font-inter w-full flex flex-col items-end justify-start relative">
      <div className=" h-full  pt-[3rem]  w-full">
        <div className=" container mx-auto   h-[150%]  ">
          <div className="flex items-center   px-6">
            <div className="flex flex-col items-start mb-6 w-full">
              <span className="text-[0.825rem] text-start capitalize  font-medium">
                {/* Good Morning, {isLoaded && user.firstName} */}
                <p className="text-[1.565rem]   mt-1 font-semibold capitalize">
                  Dashboard
                </p>
              </span>
              {/* <span className="capitalize text-[#d4d4d4]/30 mt-1.5 font-normal text-[0.75rem] ">
                Status: 
              </span> */}
            </div>
          </div>
          <div className="px-6 pt-0  w-full h-full ">
            <div className=" flex gap-6 ">
              {/* <div className="min-w-[16rem] h-fit px-[18px] py-[18px] flex-col flex justify-between rounded-lg bg-[#191b1f]">
                <div className="flex items-center  justify-start gap-1.5 ">
                  <span className="text-[0.8rem] font-normal ">
                    {" "}
                    Timed in at
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-3.5">
                  <div className=" p-[0.5rem]  rounded-md view ">
                    {" "}
                    <PiClockBold className="text-[0.8rem]  " />
                  </div>
                  <span className="text-[1.6rem] font-sans tabular-nums  font-normal">
                    07:11 <span className="text-[1.1rem]">am</span>
                  </span>
                </div>
              </div> */}

              {/* <div className="min-w-[15rem] h-fit py-[12px] p-[14px] rounded-md bg-inherit border-dark ">
                <div className="mt-0 flex items-center  gap-3.5">
                  <div className=" h-[2rem] w-[2rem]  border-dark flex-shrink-0  rounded-md  grid place-content-center">
                    {" "}
                    <PiCheckSquareOffsetBold className="text-[1rem]  " />
                  </div>
                  <div className="flex items-start  w-full flex-col justify-start ">
                    <span className="text-[0.785rem] font-medium  ">
                       Tasks
                    </span>
                    <span className="text-[1.3rem] tracking-wider font-general tabular-nums  font-medium">
                      24
                    </span>
                  </div>
                </div>
              </div>

               */}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
