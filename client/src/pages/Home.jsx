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
        <div className="h-fit  w-full flex   pb-3 items-start flex-col justify-start">
          <div className="text-[#696e79]/70 w-full py-4 pt-4  px-8  flex items-center justify-start   thin-bottom-divider ">
            <SearchBar />
          </div>
          <div className="mt-6 flex flex-col w-fit max-w-lg px-9">
            <span className="view  text-[1.47rem] font-medium  capitalize">
              Welcome,{" "}
              <span className="">
                {data?.firstName} {data?.lastName}.
              </span>
              {/* Dashboard */}
            </span>
            <span className="view text-[#696e79]/70 flex text-xs mt-1.5 gap-2 items-center   tracking-wide">
              <LuMail />
              <span>{data?.email}</span>
            </span>
          </div>
        </div>

        <div className="px-9 w-full  h-[120%] pt-6">
          {/* text-[#a7a9ad]/80 */}
          <span className=" font-medium view text-[0.85rem]">Dashboard</span>
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
                className=" px-4 py-3   bg-white  rounded-lg m cursor-pointer items-start  flex  justify-start  min-h-[5rem] gap-4 w-52"
              >
               
                 <div className="flex flex-col items-start view h-full justify-center  w-full">
                 {/* text-[#a7a9ad] */}
                  <div className=" flex  flex-col   w-full">
                    <span className="text-[0.8rem]  flex items-center gap-2 text-[#a7a9ad  font-medium ">
                      {item.description} <LuHelpCircle  className="text-[#a7a9ad]"/>
                    </span>
                  </div>
                   <span className=" pt-0 pb-0   text-inherit font-helveticaRegular text-[1.75rem] ">
                    {id === 0? "53": item.data} 
                  </span>
                </div>
                 <div className="p-2.5  rounded-full text-[#4c74fc] bg-[#4c74fc]/10  ">
                  {item.icon}
                </div>
              </div>
            ))}
          </div>
          {/* recent */}
          <div className="mt-4 view">
            <span className=" font-medium text-[0.85rem] mb-4   view  font-inter ">
              Recently added
            </span>
            <div className="w-[27rem]  bg-white rounded-lg h-[50vh] mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
