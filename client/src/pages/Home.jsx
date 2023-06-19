import React from "react";
import Sidebar from "../components/Sidebar";
import AuthContext from "../context/AuthContext";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import {
  RiQuestionLine,
  RiFile2Line,
  RiCheckboxMultipleLine,
  RiMore2Fill
} from "react-icons/ri";
import { RiMailLine } from "react-icons/ri";
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
      <div className=" h-full overflow-y-scroll px-10 w-full">
        <div className="h-fit  w-full flex   pb-4 items-start flex-col justify-start">
          {/* <div className="text-[#696e79]/70 w-full  py-3   pt-6  px-10  flex items-center justify-start ">
            <SearchBar />
          </div> */}
          <div className="view flex flex-col pt-12 w-fit max-w-lg ">
            {/* text-[#347ae2] */}
            {/* <span className="mb-2 font-medium view text-[0.8rem] ">Dashboard</span> */}
            <span className="view  text-[1.3rem] font-medium  capitalize">
              Welcome,{" "}
              <span className="">
                {data?.firstName} {data?.lastName}
              </span>
            </span>
          </div>
        </div>

        <div className=" w-full  h-[120%]  pt-0">
          <div className="mt-2 view">
            <span className=" font-medium view text-[0.785rem] text-[#696e79]/60">
              <span className="font-medium text-[#696e79]">Dashboard</span>{" "}
              Overview
            </span>
            <div className=" grid grid-flow-col grid-cols-4 w-fit gap-4 mt-4">
              {[
                {
                  description: "Total notes",
                  data: data?.totalNotes,
                  icon: <RiFile2Line />,
                },
                {
                  description: "Completed Todos",
                  data: data?.totalTodos,
                  icon: <RiCheckboxMultipleLine />,
                },
              ].map((item, id) => (
                <div
                  key={id}
                  className=" px-4 py-4   bg-[#26262e]  rounded-lg m cursor-pointer items-start  flex  justify-start flex-col min-h-[5rem] gap-3 w-52"
                >
                  {/* text-[#347ae2] */}
                  <div
                    className=" view w-full flex justify-between items-center text-[1.1rem] text-[#86868a] "
                  >
                    {item.icon} 
                  </div>

                  <div className="flex flex-col items-start view h-full justify-end  w-full">
                    {/* text-[#a7a9ad] */}

                    <span className=" pt-0 pb-0 text-inherit view w-full flex justify-start gap-1 items-end text-[1.35rem] ">
                      {id === 0 ? 25 : item.data}{" "}
                      {/* {id === 1 ? (
                        <span className="text-[0.8rem] font-medium text-[#76767c]">
                          32
                        </span>
                      ) : null} */}
                    </span>
                    <div className=" flex  flex-col   w-full">
                      <span className="text-[0.785rem] text-[#76767c] font-medium  flex items-center gap-2  ">
                        {item.description} <RiQuestionLine className="" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* recent */}
          <div className="mt-4 view">
            <span className=" font-medium text-[0.785rem] mb-4 text-[#696e79]  view  font-inter ">
              Recently added
            </span>
            {/* <div className="w-[27rem]  bg-[#26262e] rounded-lg h-[40vh] mt-4"></div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
