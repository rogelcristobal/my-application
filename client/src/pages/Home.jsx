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
        <div className="h-fit  w-full flex pt-9  pb-3 items-start flex-col justify-start">
          {/* <div className="text-[#696e79]/70 py-2 pt-4 mb-6 px-8  flex items-center justify-start    ">
          <SearchBar />
        </div> */}
          <div className=" flex flex-col w-fit max-w-lg px-9">
            <span className="  text-[1.375rem] font-medium  capitalize">
              Welcome, <span className="">{data?.firstName} {data?.lastName}.</span>
            </span>
            <span className="text-[#696e79]/70 flex text-xs mt-1.5 gap-2 items-center   tracking-wide">
              <LuMail />
              <span>{data?.email}</span>
            </span>
          </div>
          <div className=" w-fit items-center flex gap-4">
            {/* <SearchBar /> */}
            {/* <div className="  grid place-content-center font-medium capitalize rounded-full h-10 w-10 text-innherit">
            <span>{data?.firstName.split("")[0]}</span>
            <LuUser />
          </div> */}
          </div>
        </div>

        <div className="px-9 w-full  h-[120%] pt-4">
          {/* text-[#a7a9ad]/80 */}
          <span className=" font-medium text-[0.85rem]">Dashboard</span>
          <div className=" grid grid-flow-col grid-cols-4 w-fit gap-4 mt-4">
            <div className=" px-3 py-3   bg-white  rounded-lg m cursor-pointer items-center  flex  justify-start  h-fit gap-4 w-52">
              <div className="p-2.5 rounded-full text-[#4c74fc] bg-[#4c74fc]/10  ">
                <LuFile />
              </div>
              <div className="flex flex-col items-start  w-full">
                <span className=" pt-0 pb-0   text-inherit font-helveticaRegular text-[1.5rem] ">
                  {/* {!loading ? data?.totalNotes : <>loading</>} */}
                  52
                </span>
                <div className=" flex  flex-col mt-0  w-full">
                  <span className="text-[0.7rem] text-[#a7a9ad] flex items-center gap-2  font-normal ">
                    Total notes <LuHelpCircle />
                  </span>
                </div>
              </div>
            </div>

            <div className=" px-3 py-3   bg-white  rounded-lg  cursor-pointer items-center  flex  justify-start  h-fit gap-4 w-52">
              <div className="p-2.5 rounded-full text-[#4c74fc] bg-[#4c74fc]/10  ">
                <LuCheckSquare />
              </div>
              <div className="flex flex-col items-start  w-full">
                <span className=" pt-0 pb-0   text-inherit font-helveticaRegular text-[1.5rem] ">
                  {!loading ? data?.totalTodos : <>loading</>}
                </span>
                <div className=" flex  flex-col mt-0  w-full">
                  <span className="text-[0.7rem] text-[#a7a9ad] flex items-center gap-2  font-normal ">
                    Total Todos <LuHelpCircle />
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* recent */}
          <div className="mt-4">
            <span className="font-medium text-[0.85rem] mb-4     font-inter ">
              Recently added
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
