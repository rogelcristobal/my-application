import { useUser, UserButton } from "@clerk/clerk-react";

const Home = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="h-full overflow-y-auto font-inter w-full flex flex-col items-start justify-start relative">
      <div className=" h-full  pt-[5rem] px-6  w-full">
        <div className=" container mx-auto   h-[150%]  ">
          <div className="flex items-center  px-4">
            <div className="flex flex-col  w-full">
              <span className="text-[1.55rem] text-[#fafbff]  mt-2 drop-shadow-sm font-medium">
                {/* Welcome,{' '}
                <span className="capitalize">{isLoaded && user.fullName}</span> */}
                Dashboard
              </span>
             
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
           <div className="px-4 pt-3 h-full">
{/* bg-[#161822] */}
            {/* <span className="text-[0.9rem] text-gray-600  font-normal">Dashboard</span> */}
         
           </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
