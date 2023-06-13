import React from "react";
import Sidebar from "../components/Sidebar";
import AuthContext from "../context/AuthContext";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { LuHelpCircle, LuFile, LuCheckSquare,LuUser } from "react-icons/lu";
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
    <div className="h-full bg-slate-100/50 w-full flex flex-col items-start justify-start relative">
      <div className="h-fit  w-full flex pt-10 px-9 pb-3 items-center justify-between">
        <div className=" w-fit max-w-md">
          <span className="  text-[1.45rem] font-medium  capitalize">
            Welcome,{" "}
            <span className="text-[#4c74fc]">
              {data?.firstName} {data?.lastName}.
            </span>
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

      <div className="px-9 w-full  h-full pt-2">
        {/* text-[#a7a9ad]/80 */}
        <span className=" font-medium text-[0.85rem]   ">Dashboard</span>
        <div className=" grid grid-flow-col grid-cols-4 w-fit gap-4">
          <div className=" px-4 py-4   bg-white  rounded-lg mt-3 cursor-pointer items-start  flex  justify-start flex-col h-fit gap-3 w-52">
            <div className="p-3 rounded-full text-[#4c74fc] bg-[#4c74fc]/10  ">
              <LuFile />
            </div>
            <div className="flex flex-col items-start  w-full">
              <span className=" pt-0 pb-0   text-inherit font-helveticaRegular text-[1.5rem] ">
                {/* {!loading ? data?.totalNotes : <>loading</>} */}
                52
              </span>
              <div className=" flex  flex-col mt-1  w-full">
                <span className="text-[0.7rem] text-[#a7a9ad] flex items-center gap-2  font-normal ">
                  Total notes <LuHelpCircle />
                </span>
              </div>
            </div>
          </div>

          <div className=" px-4 py-4   bg-white  rounded-lg mt-3 cursor-pointer items-start  flex  justify-start flex-col h-fit gap-3 w-52">
            <div className="p-3 rounded-full text-[#4c74fc] bg-[#4c74fc]/10  ">
              <LuCheckSquare />
            </div>
            <div className="flex flex-col items-start  w-full">
              <span className=" pt-0 pb-0   text-inherit font-helveticaRegular text-[1.5rem] ">
                {!loading ? data?.totalTodos : <>loading</>}
              
              </span>
              <div className=" flex  flex-col mt-1  w-full">
                <span className="text-[0.7rem] text-[#a7a9ad] flex items-center gap-2  font-normal ">
                  Total Todos <LuHelpCircle />
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* recent */}
        <div className="mt-6">
          <span className="font-medium text-[0.85rem] mb-3     font-inter ">
            Recently added
          </span>
        </div>
      </div>
      {/* content */}
    </div>
  );
};

export default Home;
