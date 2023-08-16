import { useUser } from "@clerk/clerk-react";
const Home = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="h-full overflow-y-auto font-inter w-full flex flex-col items-end justify-start relative">
      {/* <div className=" flex-shrink-0 bg-[#101011] items-center top-0 right-0 justify-between flex   h-[3.5rem]  z-10  px-10   w-full">
        <PiMagnifyingGlass className="text-[#b7b7b7]/50 text-[1.1rem]" />
        <div className="items-center  h-full justify-end flex ">
          <div className="w-fit h-full  justify-between  flex-shrink-0 flex gap-4 items-center">
            <span className="text-[0.75rem] text-[#e8e8e8] capitalize">
              {isLoaded && user.fullName}
            </span>
            <User></User>
          </div>
        </div>
      </div> */}
      <div className=" h-full  pt-[3.75rem] px-5  w-full">
        <div className=" container mx-auto   h-[150%]  ">
          <div className="flex items-center  px-5">
            <div className="flex flex-col  w-full">
              {/* <span className="text-[0.8rem]  text-[#686868]  capitalize"> Dashboard</span> */}

              <span className="text-[0.8rem]  text-[#686868]/70  font-normal">
                <span className="capitalize ">Dashboard</span>
                <p className="text-[1.4rem] text-[#e8e8e8]  mt-1.5 font-medium capitalize">
                  {" "}
                  Welcome back, {isLoaded && user.firstName}
                </p>
              </span>
              {/* <span className="text-[#686868] mt-1 text-[0.775rem]">{isLoaded&&user.primaryEmailAddress.emailAddress}</span> */}
            </div>

            {/* <UserButton
              appearance={{
                elements: {
                  userButtonPopoverCard:
                    " rounded-lg shadow-none view bg-white font-inter text-inherit h-fit  w-[20rem]",
                  userButtonPopoverMain: " ",
                  userPreview: " ",
                  userPreviewAvatarContainer: " ",
                  userPreviewTextContainer: "  ",
                  userPreviewMainIdentifier: "text-[0.9remrem]  capitalize",
                  userPreviewSecondaryIdentifier: "  mt-1 text-[#676269]",
                  userButtonPopoverActions: "  mt-4",
                  userButtonPopoverActionButtonIconBox: "  ",
                  userButtonPopoverActionButtonText:
                    "  text-inherit  font-normal text-[0.8rem]",
                  userButtonPopoverActionButton: "  text-inherit  px-4",
                  userButtonPopoverFooter: " ",
                },
              }}
            ></UserButton> */}
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
