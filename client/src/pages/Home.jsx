
import { useUser,UserButton } from "@clerk/clerk-react";


const Home = () => {
  
  const {user,isLoaded} = useUser()
 
  return (
    <div className="h-full overflow-y-auto font-inter w-full flex flex-col items-start justify-start relative">
      <div className=" h-full  pt-[3.5rem] px-6 w-full">
        <div className=" w-full   h-[120%]  ">
          <div className="flex items-center  px-4">
            <div className="flex flex-col  w-full">
              <span className="text-[0.875rem] text-gray-600 font-medium">Dashboard</span>
            <span className="text-[1.5rem] mt-1.5 drop-shadow-sm font-medium">
              Welcome back, <span className="capitalize">{isLoaded&&user.firstName}</span>
            </span>
            </div>
            <UserButton appearance={{
              elements:{
                userButtonPopoverCard:' bg-[#151820] font-inter text-white h-fit  w-[20rem]',
                userButtonPopoverMain :'',
                userPreview :'',
                userPreviewAvatarContainer :'',
                userPreviewTextContainer :'',
                userPreviewMainIdentifier :' ',
                userPreviewSecondaryIdentifier :' mt-2 text-[#676269]',
                userButtonPopoverActions :'',
                userButtonPopoverActionButtonIconBox :' ',
                userButtonPopoverActionButtonText :' text-white  font-thin text-[0.865rem]',
                userButtonPopoverActionButton  :' text-white  px-4',
                userButtonPopoverFooter :''
              }
            }}></UserButton>
          </div>      
            
        </div>
      </div>
    </div>
  );
};

export default Home;
