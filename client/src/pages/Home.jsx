import React from "react";
import { useSelector } from "react-redux";
import {
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  RedirectToSignIn,
} from "@clerk/clerk-react";
const Home = () => {
  const currentUser = useSelector((state) => state.currentUser.data);
  const userDataLoading = useSelector((state) => state.currentUser.loading);
  
  const {isLoaded,isSignedIn,user} = useUser()
  if(isLoaded){
    if(isSignedIn){
      console.log(user.id)
    }else{
      console.log('not signed in')
    }
  }else{
    console.log('auth loading')
  }
  return (
    <div className="h-full overflow-y-auto  w-full flex flex-col items-start justify-start relative">
      <div className=" h-full  pt-[4rem] px-6 w-full">
        <div className=" w-full   h-[120%]  ">
          <div className="">
            <span className="text-[1.6rem] ml-6 drop-shadow-sm font-medium">
              Dashboard
            </span>
          </div>

          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

export default Home;
