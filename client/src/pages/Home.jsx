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
import { LuMail } from "react-icons/lu";
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
      <div className=" h-full overflow-y-scroll px-8 w-full">
        <div className="h-fit w-full flex   pb-4 items-start flex-col justify-start">
          <div className="view flex flex-col pt-10 w-full  ">
            <span className="view flex flex-col text-[1.4rem] font-medium  capitalize">
              <span className="mb-0.5 font-medium view text-[0.875rem] ">
                Welcome,
              </span>
              <span className="">
                {currentUser?.firstName} {currentUser?.lastName}
              </span>
              {/* <span className="normal-case mt-1.5 flex items-center  gap-2 font-medium text-[#696e79]/70 text-[0.75rem]"><LuMail />{currentUser?.email}</span> */}
            </span>
          </div>
        </div>

        <div className=" w-full  h-[120%]  pt-2">
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
                  icon: <RiFile2Line />,
                },
                {
                  description: "Total Todos",
                  // data: currentUser?.totalTodos,
                  icon: <RiCheckboxMultipleLine />,
                },
              ].map((item, id) => (
                <div
                  key={id}
                  className=" px-4 py-4   bg-[#26262e]/80  rounded-lg m cursor-pointer items-center  flex  justify-start  min-h-[5rem] gap-2 w-52"
                >
                  <div className="flex flex-col items-start view h-full justify-end  w-full">
                    {/* text-[#a7a9ad] */}

                    <div className=" flex  flex-col   w-full">
                      <span className="text-[0.785rem] text-[#76767c] font-medium  flex items-center gap-2  ">
                        {item.description}
                      </span>
                      <span className=" pt-0 pb-0 text-inherit view w-full flex justify-start gap-1 items-end text-[1.25rem] ">
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
                  <div className="  rounded-full view w-fit flex justify-between items-center text-[1.15rem] text-[#86868a] ">
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
