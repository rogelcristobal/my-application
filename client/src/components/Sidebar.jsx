import React from "react";
import {
  LuHome,
  LuFolder,
  LuFeather,
  LuChevronLeft,
  LuListChecks,
  LuEdit3,
  LuSettings,
} from "react-icons/lu";
import {RiLoader3Fill,RiFolder3Line,RiCheckboxMultipleLine,RiDraftLine,RiListSettingsLine} from 'react-icons/ri'
import { RiHome5Line,RiFolderFill,RiCheckboxMultipleFill,RiDraftFill ,RiListSettingsFill} from "react-icons/ri";
import { motion, useAnimation } from "framer-motion";
import SidebarLink from "./SidebarLink";
import AuthContext from "../context/AuthContext";
const Sidebar = () => {
  const [state, setState] = React.useState(false);
  const { data } = React.useContext(AuthContext);
  const sidebarControl = useAnimation();
  const handleToggleSidebar = () => {
    setState(!state);
    if (state) {
      sidebarControl.start({ width: "15.5rem" });
    } else {
      sidebarControl.start({ width: "4rem" });
    }
  };

  return (
    <motion.div
      animate={sidebarControl}
      initial={{ width: "16rem" }}
      transition={{ duration: 0.3 }}
      className={`${
        state ? "w-[4rem]" : "w-[15.5rem]"
      } whitespace-nowrap  relative bg-[#26262e] view  h-full flex  flex-col  items-center justify-start  flex-shrink-0   `}
    >
      <div
        className={`${
          state ? "px-[0.5rem]" : " px-4  "
        } w-full   relative flex view items-center justify-start  pt-8 pb-10   `}
      >
        <div className="view flex items-center justify-center">
          <div
            className={`view grid cursor-pointer relative rounded-lg p-[0.6rem] place-content-center ${
              state ? "mr-0" : "mr-0"
            }`}
          >
            <RiLoader3Fill className="text-[1.3rem] " />
          </div>
          {!state && (
            <span className="mt-1 relative   w-fit text-start pl-0 whitespace-nowrap overflow-hidden text-[0.95rem]  font-medium">
              NoteStack
              <div></div>
            </span>
          )}
        </div>

        {/* toggle btn */}
        {/* bg-[#1d1b22] */}
        {/* <motion.button
          onClick={handleToggleSidebar}
          className={`absolute  h-[1.6rem] w-[1.6rem] grid place-content-center bg-[#26262e] rounded-full -bottom-2   cursor-pointer  z-10 text-xs text-inherit  right-0 translate-x-1/2 `}
        >
          <LuChevronLeft />
        </motion.button>
        <div className="absolute  h-[2.4rem] w-[2.4rem] grid place-content-center bg-[#1d1b22] rounded-full -bottom-3.5   cursor-pointer  z-8 text-xs text-inherit  -right-5 translate-x-1/"></div> */}
      </div>
      <div className="w-full h-full  flex flex-col justify-start items-start">
        <div
          className={`${
            state ? "mt-[1.5rem] px-0 " : "px-3.5 mt-[1.5rem]"
          } flex   w-full items-center view  pt-0 justify-center flex-col`}
        >
          {!state && (
            <span className=" px-2 text-[0.7rem] font-normal w-full text-left  uppercase text-[#696e79]  mb-3">
              Menu
            </span>
          )}
          {[
            { path: "/dashboard", title: "dashboard", icon: <RiHome5Line /> },
            {
              path: "/collections",
              title: "collections",
              icon: <RiFolder3Line />,
              count: data?.noteCollection?.length,
            },
            { path: "/todos", title: "todos", icon: <RiCheckboxMultipleLine /> },
            { path: "/blogs", title: "Blogs", icon: <RiDraftLine /> },
          ].map((item, id) => (
            <SidebarLink
              key={id}
              path={item.path}
              sidebarState={state}
              title={item.title}
              icon={item.icon}
              count={item?.count}
            />
          ))}
          {/* <div className="w-full  thin-top-divider h-[0.1rem] mt-4"></div> */}
        </div>
        {/* settings buttons */}
      </div>
      <div
        className={`${
          state ? " px-2 " : "px-3 "
        } flex   w-full items-center mt-4  pb-6 justify-center flex-col`}
      >
        {/* {!state && (
            <span className=" px-2 text-[0.75rem] font-medium w-full text-left  text-[#a0a6b1]  mb-1.5">
              Account
            </span>
          )} */}
        {[{ path: "/settings", title: "settings", icon: <RiListSettingsLine /> }].map(
          (item, id) => (
            <SidebarLink
              key={id}
              path={item.path}
              sidebarState={state}
              title={item.title}
              icon={item.icon}
              count={item?.count}
            />
          )
        )}
      </div>
    </motion.div>
  );
};

export default Sidebar;
