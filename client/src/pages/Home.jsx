import React from "react";
import Sidebar from "../components/Sidebar";
import AuthContext from "../context/AuthContext";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import {
  RiQuestionLine,
  RiFile2Line,
  RiCheckboxMultipleLine,
  RiMore2Fill,
} from "react-icons/ri";
import { LuFile ,LuCheckSquare} from "react-icons/lu";
import SearchBar from "../components/SearchBar";
Sidebar;
const Home = () => {
  const navigate = useNavigate();
  const { currentUser,userDataLoading } = React.useContext(AuthContext);
  const logOutUser = async () => {
    try {
      await auth.signOut();
      console.log("User signed out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if(!userDataLoading){
   
    console.log('monggodb:',currentUser)
  }
  

  return (
    <div className="h-full  w-full flex flex-col items-start justify-start relative">
      <div className=" h-full overflow-y-scroll px-0 w-full">
        <div className="h-fit w-full flex   pb-4 items-start flex-col justify-start">
          <div className="view flex flex-col pb-8 w-full bg-white  thin-bottom-divider">
            <div className="h-auto w-full  px-10 py-4">
              <SearchBar></SearchBar>
            </div>
            <div className="px-10">
              <span className="view flex flex-col text-[1.45rem] font-semibold mt-6  capitalize">
              <span className="mb-1.5 font-medium view text-[0.9rem] text-[#74838a]">
                Dashboard
              </span>
              <span className="">
                Welcome, {currentUser?.firstName} {currentUser?.lastName}
              </span>
              {/* <span className="normal-case mt-1.5 flex items-center  gap-2 font-medium text-[#696e79]/70 text-[0.75rem]"><LuMail />{currentUser?.email}</span> */}
            </span>
            </div>
          </div>
        </div>

        <div className=" w-full  h-[120%] px-8 pt-2">
          <div className=" view">
            {/* <span className=" font-medium view text-[0.75rem] text-[#696e79]/60">
              <span className="font-medium text-[#696e79]">
                Track your Progress here.
              </span>
              
            </span> */}
            <div className=" grid grid-flow-col grid-cols-4 w-fit gap-3.5 mt-3">
              {[
                {
                  description: "Total notes",
                  // data: currentUser?.totalNotes,
                  icon: <LuFile />,
                },
                {
                  description: "Total Todos",
                  // data: currentUser?.totalTodos,
                  icon: <LuCheckSquare />,
                },
              ].map((item, id) => (
                <div
                  key={id}
                  className=" px-4 py-4   bg-[#ffffff]  rounded-lg m cursor-pointer items-center  flex  justify-start   gap-2 w-52"
                >
                  <div className="flex flex-col items-start view h-full justify-end  w-full">
                    {/* text-[#a7a9ad] */}

                    <div className=" flex  flex-col   w-full">
                      <span className="text-[0.775rem] text-[#74838a] font-medium  flex items-center gap-2  ">
                        {item.description}
                      </span>
                      <span className=" pt-1 pb-0 text-inherit view w-full flex justify-start gap-1 items-end text-[1.45rem] font-semibold">
                        {id === 0 ? 25 : 3}
                        {/* {id === 1 ? (
                        <span className="text-[0.8rem] font-medium text-[#76767c]">
                          32
                        </span>
                      ) : null} */}
                      </span>
                    </div>
                  </div>
                  {/* text-[#347ae2] */}
                  <div className="  rounded-full view w-fit flex justify-between items-center text-[1rem] p-2.5  bg-[#204e69]/10">
                    {item.icon}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* recent */}
          <div className="mt-4 view">
            <span className=" font-medium text-[0.75rem] mb-4 text-[#696e79]  view  font-inter ">
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
