import React from "react";
import Sidebar from "../components/Sidebar";
import AuthContext from "../context/AuthContext";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
Sidebar;
const Home = () => {
  const navigate = useNavigate()
  const {data,userLoading}  = React.useContext(AuthContext)
   const logOutUser = async () => {
    try {
      await auth.signOut();
      console.log("User signed out successfully");
      navigate('/login')
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <div className="h-full  pt-9 w-full flex flex-col items-start justify-start relative">
      
       <div className="h-fit w-full flex  px-9 pb-3 flex-col">
        {/* <span className="mb-3 font-medium text-[0.85rem] text-[#6360ea]">Dashboard</span> */}
        <span className="font-inter text-[1.40rem] capitalize">Welcome, {data?.firstName}.</span>
        <span className="text-[0.75rem] font-inter text-[#77787f] mt-4 ">
          Here's your data today.
        </span>
      </div>

      <div className="px-8   w-full h-[calc(100%-8rem)] ">
        <div className="bg-[#1e1f23] border-dark sample px-4 py-4 rounded-md mt-0 cursor-pointer  flex flex-col h-fit w-60">
          <div className=" flex flex-col w-fit">
            <span className="text-[0.775rem] font-inter  text-[#97999e]">
              Total notes
            </span>
            <span className="   text-inherit font-helveticaRegular text-[1.7rem] ">
              {data?.totalNotes}
            </span>
          </div>
        </div>

       
      </div>
      {/* content */}
    </div>
  );
};

export default Home;
