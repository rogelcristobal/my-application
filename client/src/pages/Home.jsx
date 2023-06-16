import React from "react";
import Sidebar from "../components/Sidebar";
import AuthContext from "../context/AuthContext";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import {
  LuHelpCircle,
  LuFile,
  LuCheckSquare,
  LuMail,
  LuSearch,
} from "react-icons/lu";
import SearchBar from "../components/SearchBar";
Sidebar;
const Home = () => {
  const navigate = useNavigate();
  const { data, loading } = React.useContext(AuthContext);
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
    <div className="h-full  w-full flex flex-col items-start justify-start relative">
      <div className=" h-full overflow-y-scroll w-full">
        <div className="h-fit w-full flex   pb-6 items-start flex-col justify-start">
          <div className="text-[#696e79]/70 w-full  py-3   pt-6  px-8  flex items-center justify-start ">
            <SearchBar />
          </div>
          <div className="view flex flex-col pt-4 w-fit max-w-lg px-8">
            {/* text-[#347ae2] */}
             {/* <span className="mb-2 font-medium view text-[0.8rem] ">Dashboard</span> */}
            <span className="view  text-[1.4rem] font-medium  capitalize">
              Welcome,{" "}
              <span className="">
                {data?.firstName} {data?.lastName}
              </span>
              {/* Dashboard */}
            </span>
            <span className="view text-[#696e79]/70 flex gap-1  mt-1.5  items-center   tracking-wide text-[0.8rem]">
              <LuMail />
              <span> {data.email}</span>
            </span>
          </div>
        </div>

        <div className="px-8 w-full  h-[120%]  pt-4">
          {/* text-[#a7a9ad]/80 */}
          <span className=" font-medium view text-[0.875rem] text-[#696e79]">Overview</span>
          <div className=" grid grid-flow-col grid-cols-4 w-fit gap-4 mt-4">
            {[
              {
                description: "Total notes",
                data: data?.totalNotes,
                icon: <LuFile />,
              },
              {
                description: "Total todos",
                data: data?.totalTodos,
                icon: <LuCheckSquare />,
              },
            ].map((item, id) => (
              <div
                key={id}
                className=" px-4 py-4   bg-white  rounded-lg m cursor-pointer items-start  flex  justify-start flex-col  min-h-[5rem] gap-4 w-52"
              >
               
                
                {/* text-[#347ae2] */}
                 <div className="p-2.5  rounded-full text-[0.925rem] bg-[#347ae2]/10 text-[#347ae2] ">
                  {item.icon}
                </div>

                 <div className="flex flex-col items-start view h-full justify-center  w-full">
                 {/* text-[#a7a9ad] */}
                 
                   <span className=" pt-0 pb-0   text-inherit font-helveticaRegular text-[1.7rem] ">
                    {item.data}
                  </span>
                   <div className=" flex  flex-col   w-full">
                    <span className="text-[0.785rem] text-[#696e79] font-medium  flex items-center gap-2  ">
                      {item.description} <LuHelpCircle  className="text-[#a7a9ad]"/>
                    </span>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
          {/* recent */}
          <div className="mt-5 view">
            <span className=" font-medium text-[0.8rem] mb-4 text-[#696e79]  view  font-inter ">
              Recently added
            </span>
            <div className="w-[27rem]  bg-white rounded-lg h-[70vh] mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
