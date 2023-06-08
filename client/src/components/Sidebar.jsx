import React from "react";
import {LuLayout, LuFolder,LuFlower,LuChevronsLeft,LuCheckSquare,LuFileEdit} from 'react-icons/lu'
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
      } whitespace-nowrap  relative bg-[#1e1f23]  sample h-full flex  flex-col  items-center justify-start  flex-shrink-0   `}
    >
      <div
        className={`${
          state ? "px-3" : " px-4  "
        } w-full   relative flex  items-center justify-start h-24  pt-0  `}
      >
        <div
          className={`border-dark grid cursor-pointer  rounded-full p-[0.5rem] place-content-center ${
            state ? "mr-0" : "mr-0"
          }`}
        >
          <LuFlower className="text-lg  text-[#e4e6e7]" />
        </div>
        {!state && (
          <span className="mt-0    w-fit text-start pl-2 whitespace-nowrap overflow-hidden text-[0.95rem] text-[#e4e6e7] font-semibold">
            NoteStack
          </span>
        )}

        {/* toggle btn */}
        <motion.button
          onClick={handleToggleSidebar}
          className={`absolute  px-2 py-2 rounded-full -bottom-4 border-dark sample bg-[#1e1f23] hover:bg-[#27282f]  cursor-pointer  z-10 text-xs text-inherit  right-0 translate-x-1/2 `}
        >
          <LuChevronsLeft />
        </motion.button>
      </div>
      <div className="w-full  mb-2 mt-4"></div>
      <div
        className={`${
          state ? "mt-[1.485rem] px-2" : "px-3"
        } flex   w-full items-center  pt-1.5 justify-center flex-col`}
        >
        {/* {state && <div className="w-full  thin-bottom-divider mb-4"></div>} */}
        {!state && (
          <span className=" px-2 text-[0.75rem] font-medium w-full text-left  text-[#a0a6b1]  mb-1.5">
            Menu
          </span>
        )}

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
