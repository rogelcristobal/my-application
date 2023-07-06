import React from "react";
import { LuListChecks,LuArchive, LuEdit3, LuSettings ,LuChevronLeft} from "react-icons/lu";
import {BiArchive,BiLayout,BiListCheck,BiEditAlt} from 'react-icons/bi'
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
      sidebarControl.start({ width: "16rem" });
    } else {
      sidebarControl.start({ width: "4rem" });
    }
  };

  // console.log("sidebar",currentUser)
  return (
    <motion.div
      animate={sidebarControl}
      initial={{ width: "16rem" }}
      transition={{ duration: 0.3 }}
      className={`${
        state ? "w-[4rem]" : "w-[16rem]"
      } whitespace-nowrap  relative border-dark-right h-full flex  flex-col  items-center justify-start  flex-shrink-0`}
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
      <div className="w-full h-full mt-0  flex flex-col border-dark-top justify-start items-start">
        <div
          className={`${
            state ? " px-0 " : "px-4"
          } flex   w-full items-center   py-4 justify-center flex-col`}
        >
          {!state && (
            <span className="  text-[0.7rem] uppercase w-full  text-left  Capitalize   mb-3">
              General
            </span>
          )}
          {[
            { path: "/dashboard", title: "dashboard", icon: <BiLayout /> },
            {
              path: "/collections",
              title: "notes",
              icon: <BiArchive />,
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
