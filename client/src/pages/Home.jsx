import { useUser } from "@clerk/clerk-react";

const Home = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="h-full overflow-y-auto font-inter w-full flex flex-col items-start justify-start relative">
      <div className=" h-full  pt-[3rem] px-6  w-full">
        <div className=" container mx-auto   h-[150%]  ">
          <div className="flex items-center  px-3">
            <div className="flex flex-col  w-full">
              <span className="text-[1.35rem] text-[#e8e8e8]  font-normal">
                Welcome back,{' '}
                <span className="capitalize">{isLoaded && user.firstName}</span>
                
              </span>
              <span className="text-[#686868]  text-[0.775rem]">{isLoaded&&user.primaryEmailAddress.emailAddress}</span>
              
             
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
           <div className="px-3 pt-3 h-full">
            <span className="text-[0.875rem] mt-6  text-[#686868] capitalize"> Dashboard</span>
            <div className=" flex gap-4 mt-3">
              <div className="w-64 h-32  rounded-md bg-[#212121]"></div>
              <div className="w-64 h-32  rounded-md bg-[#212121]"></div>

            </div>
         
           </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
