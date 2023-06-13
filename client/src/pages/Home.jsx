import React from "react";
import Sidebar from "../components/Sidebar";
import AuthContext from "../context/AuthContext";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { LuHelpCircle } from "react-icons/lu";
import SearchBar from "../components/SearchBar";
Sidebar;
const Home = () => {
  const navigate = useNavigate();
  const { data, userLoading } = React.useContext(AuthContext);
  const logOutUser = async () => {
    try {
      await auth.signOut();
      console.log("User signed out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <div className="h-full  container mx-auto w-full flex flex-col items-start justify-start relative">
      <div className="h-fit  w-full flex pt-10 px-9 pb-3 items-center justify-between">
        <div className=" w-fit max-w-md">
           <span className="  text-[1.45rem] font-medium  capitalize">
          Welcome,
          <span className="text-[#4c74fc]">
            {data?.firstName} {data?.lastName}.
          </span>
        </span>
        </div>
        <div className=" w-fit items-center flex gap-4">
          {/* <SearchBar /> */}
          {/* <div className=" grid place-content-center font-medium capitalize rounded-full h-10 w-12">
            <span>{data?.firstName.split("")[0]}</span>
          </div> */}

        </div>
      </div>

      <div className="px-9 w-full  h-full pt-2">
        {/* text-[#a7a9ad]/80 */}
        <span className="mt-4 font-normal text-[0.775rem] text-[#a7a9ad]  ">
          Dashboard
        </span>
        <div className=" px-0 thin-box-divider drop-shadow  rounded-lg mt-3 cursor-pointer  flex flex-col justify-start min-h-[6rem] w-60">
          <div className=" flex  flex-col px-4 py-3 w-full">
            <span className="text-[0.785rem] flex items-center gap-2  font-medium ">
              Total notes <LuHelpCircle />
            </span>
          </div>
          <span className="px-4 pt-0 pb-2   text-inherit font-helveticaRegular text-[1.8rem] ">
            32
          </span>
        </div>
        <div className="mt-6">
          <span className="font-normal text-[0.775rem] mb-3    text-[#a7a9ad] font-inter ">
            Recently added{" "}
          </span>
        </div>
      </div>
      {/* content */}
    </div>
  );
};

export default Home;
