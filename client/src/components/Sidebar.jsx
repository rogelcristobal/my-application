import React from "react";
import { LuListChecks,LuArchive, LuEdit3, LuSettings ,LuChevronLeft} from "react-icons/lu";
import {BiNote,BiLayout,BiListCheck,BiEditAlt} from 'react-icons/bi'
import { TbFolder, TbLayoutGrid } from "react-icons/tb";
import { motion, useAnimation } from "framer-motion";
import SidebarLink from "./SidebarLink";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const [state, setState] = React.useState(false);
  const currentUserLoading = useSelector((state) => state.currentUser.loading);
  const currentUser = useSelector((state) => state.currentUser.data);
  const sidebarControl = useAnimation();
  const handleToggleSidebar = () => {
    setState(!state);
    if (state) {
      sidebarControl.start({ width: "16.5rem" });
    } else {
      sidebarControl.start({ width: "4rem" });
    }
  };

  // console.log("sidebar",currentUser)
  return (
    <motion.div
      animate={sidebarControl}
      initial={{ width: "16.5rem" }}
      transition={{ duration: 0.3 }}
      className={`${
        state ? "w-[4rem]" : "w-[16.5rem]"
      } whitespace-nowrap  relative border-r-[1px] border-solid border-neutral-400/10 bg-[#1c1d21] h-full flex  flex-col  items-center justify-start  flex-shrink-0`}
    >
      <div
        className={`w-full   relative flex   items-center justify-start   h-[4.7rem]   `}
      >
        <div className=" flex items-center justify-center">
          {/* <div
            className={`view grid  cursor-pointer relative rounded-lg p-[0.6rem] place-content-center ${
              state ? "mr-0" : "mr-0"
            }`}
          >
            <LuSettings />
          </div> */}
          {/* {!state && (
            <span className=" relative   w-fit text-start ml-3 whitespace-nowrap overflow-hidden text-md ">
              WhiteSpace
            </span>
          )} */}
        </div>

        {/* toggle btn */}
        {/* <motion.button
          onClick={handleToggleSidebar}
          className={`absolute  h-[2.2rem] w-[2.2rem]  p-1  rounded-full -bottom-2   cursor-pointer  z-10 text-xs text-inherit  right-0 translate-x-1/2 `}
        >
          <div className="view rounded-full h-full grid place-content-center w-full">
            <LuChevronLeft />
          </div>
        </motion.button> */}
      </div>
      <div className="w-full h-full mt-0  flex flex-col justify-start items-start">
        <div
          className={`${
            state ? " px-0 " : "px-[0.75rem]"
          } flex   w-full items-center mt-2   py-4 justify-center flex-col`}
        >
          {!state && (
            <span className=" px-1 text-[0.7rem] text-[#6a6b6f] uppercase w-full  text-left  Capitalize   mb-3">
              General
            </span>
          )}
          {[
            { path: "/dashboard", title: "dashboard", icon: <BiLayout /> },
            {
              path: "/collections",
              title: "my notes",
              icon: <BiNote />,
              count: currentUser?.noteCollections?.length,
              loading: currentUserLoading,
            },
            { path: "/todos", title: "todos", icon: <BiListCheck /> },
            { path: "/blogs", title: "Blogs", icon: <BiEditAlt /> },
          ].map((item, id) => (
            <SidebarLink
              key={id}
              path={item.path}
              sidebarState={state}
              title={item.title}
              icon={item.icon}
              count={item?.count}
              loading={item?.loading}
            />
          ))}
        </div>
      </div>
      {/* <div
        className={`${
          state ? " px-2 " : "px-3.5 "
        } flex   w-full items-center mt-4  pb-6 justify-center flex-col`}
      >
        {[{ path: "/settings", title: "settings", icon: <LuSettings /> }].map(
          (item, id) => (
            <SidebarLink
              key={id}
              path={item.path}
              sidebarState={state}
              title={item.title}
              icon={item.icon}
            />
          )
        )}
      </div> */}
    </motion.div>
  );
};

export default Sidebar;
