import React from "react";
import { TbLayoutGrid, TbChevronLeft, TbEggs, TbFolder } from "react-icons/tb";
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
      } whitespace-nowrap border-dark-right relative bg-[#1e1f23]  h-full flex  flex-col  items-center justify-start  flex-shrink-0   `}
    >
      <div
        className={`${
          state ? " " : "  "
        } w-full   relative flex flex-col items-center justify-start h-32  pt-8 px-2.5 `}
      >
        <div
          className={`bg-[#1f2125] grid border-[1px] border-solid border-neutral-600 rounded-full p-[0.7rem] place-content-center ${
            state ? "mr-0" : "mr-0"
          }`}
        >
          <TbEggs className="text-lg  text-white" />
        </div>
        {!state && (
          <span className="mt-3   w-full text-center whitespace-nowrap overflow-hidden text-[0.8rem] text-white font-medium">
            My Project
          </span>
        )}

        {/* toggle btn */}
        <motion.button
          onClick={handleToggleSidebar}
          className={`absolute  px-2 py-2 rounded-full bottom-0  bg-[#27282f]  cursor-pointer  z-10 text-xs text-white  right-0 translate-x-1/2 `}
        >
          <TbChevronLeft />
        </motion.button>
      </div>
      {!state && (
        <span className=" text-[0.75rem]  w-full text-left px-5 text-gray-400/70  mt-4 mb-3">
          Menu
        </span>
      )}
      <div
        className={`${
          state ? "mt-[1.825rem] px-2.5" : "px-2.5"
        } flex   w-full items-center pt-1.5 justify-center flex-col`}
      >
        {state && <div className="w-full border-dark-bottom mb-4"></div>}

        <SidebarLink
          path="/dashboard"
          sidebarState={state}
          title="Dashboard"
          icon={<TbLayoutGrid />}
        />

        <SidebarLink
          sidebarState={state}
          title="Collections"
          icon={<TbFolder />}
          path="/collections"
          count={data?.noteCollection.length}
        ></SidebarLink>
        <div className="w-full border-dark-bottom mt-4"></div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
