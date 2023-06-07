import React from "react";
import {LuLayout, LuFolder,LuFlame,LuChevronsLeft} from 'react-icons/lu'
import {motion, useAnimation} from 'framer-motion'
import SidebarLink from "./SidebarLink";
import AuthContext from "../context/AuthContext";
const Sidebar = () => {
  const [state, setState] = React.useState(false);
  const { data } = React.useContext(AuthContext);
  const sidebarControl = useAnimation()
  const handleToggleSidebar = () => {
    setState(!state);
    if(state){
      sidebarControl.start({width:"15.5rem"})
    }else {
      sidebarControl.start({ width: "4rem" }); 
    }
  };
  
  
  return (
    <motion.div
      animate={sidebarControl} initial={{width:"15.5rem"}} transition={{duration:0.3}}
      className={`${
        state ? "w-[4rem]" : "w-[15.5rem]"
      } whitespace-nowrap  relative bg-[#1e1f23] border-dark-right sample h-full flex  flex-col  items-center justify-start  flex-shrink-0   `}
    >
      <div
        className={`${
          state ? "px-2.5" : " px-6 "
        } w-full   relative flex  items-center justify-start h-28  pt-0  `}
      >
        <div
          className={`border-dark grid bg-[#17181c] cursor-pointer  rounded-full p-[0.7rem] place-content-center ${
            state ? "mr-0" : "mr-0"
          }`}
        >
          <LuFlame className="text-lg  text-[#e4e6e7]" />
        </div>
        {!state && (
          <span className="mt-0    w-fit text-start pl-2.5 whitespace-nowrap overflow-hidden text-[0.9rem] text-[#e4e6e7] font-semibold">
            MyApplication
          </span>
        )}

        {/* toggle btn */}
        {/* <motion.button
          onClick={handleToggleSidebar}
          className={`absolute  px-2 py-2 rounded-full -bottom-4 border-dark sample bg-[#1e1f23] hover:bg-[#27282f]  cursor-pointer  z-10 text-xs text-inherit  right-0 translate-x-1/2 `}
        >
          <LuChevronsLeft />
        </motion.button> */}
      </div>
      <div className="w-full border-dark-top mb-2"></div>
      {!state && (
        <span className=" text-[0.75rem] font-medium w-full text-left px-5 text-[#a0a6b1]  mt-4 mb-1.5">
          Menu
        </span>
      )}
      <div
        className={`${
          state ? "mt-[1.485rem] px-2.5" : "px-2.5"
        } flex   w-full items-center pt-1.5 justify-center flex-col`}
      >
        {/* {state && <div className="w-full  thin-bottom-divider mb-4"></div>} */}

        <SidebarLink
          path="/dashboard"
          sidebarState={state}
          title="Dashboard"
          icon={<LuLayout />}
        />

        <SidebarLink
          sidebarState={state}
          title="Collections"
          icon={<LuFolder />}
          path="/collections"
          count={data?.noteCollection.length}
        ></SidebarLink>
      </div>
    </motion.div>
  );
};

export default Sidebar;
