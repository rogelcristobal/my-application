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
    <div className="h-full   w-full flex flex-col items-start justify-start relative">
      
       <div className="h-fit  w-full flex pt-6 px-9 pb-0 flex-col">
        <span className="mb-1.5 font-semibold text-[0.8rem] text-[#3b84fb]">Dashboard</span>
        <span className="font-plus text-[1.325rem] font-medium  capitalize">Welcome,<span className="text-semibold  "> {data?.firstName} {data?.lastName}. </span></span>
        {/* <span className="text-[0.8rem] font-plus text-black mt-3 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, eos?
        </span> */}
      </div>

      <div className="px-8 w-full h-full pt-8">
        {/* <div className="h-1 thin-top-divider mb-4"></div> */}
        <div className="bg-[#ffffff] px-4 py-4 rounded-md mt-0 cursor-pointer  flex flex-col justify-end min-h-[7rem] w-60">
          <div className=" flex  flex-col w-fit">
            <span className="   text-inherit font-helveticaRegular text-[1.7rem] ">
              32
            </span>
            <span className="text-[0.775rem] font-plus font-medium text-[#97999e]">
              Total notes
            </span>
          </div>
        </div>
        <div className="mt-4">
          <span className="text-[0.85rem] font-semibold ">Recently added notes</span>
        </div>
      </div>
      {/* content */}
    </div>
  );
};

export default Home;
