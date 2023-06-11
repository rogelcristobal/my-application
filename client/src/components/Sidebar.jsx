import React from "react";
import {
  LuLayout,
  LuFolder,
  LuFlower,
  LuChevronLeft,
  LuListChecks,
  LuEdit3,
  LuSettings,
} from "react-icons/lu";
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
      initial={{ width: "15.5rem" }}
      transition={{ duration: 0.3 }}
      className={`${
        state ? "w-[4rem]" : "w-[16rem]"
      } whitespace-nowrap  relative bg-[#1e1f23]  sample h-full flex  flex-col  items-center justify-start  flex-shrink-0   `}
    >
      <div
        className={`${
          state ? "px-3" : " px-4  "
        } w-full   relative flex  items-center justify-start  pt-10 pb-12   `}
      >
        <div
          className={`border-dark grid cursor-pointer  rounded-full p-[0.5rem] place-content-center ${
            state ? "mr-0" : "mr-0"
          }`}
        >
          <LuFlower className="text-lg  text-[#e4e6e7]" />
        </div>
        {!state && (
          <span className="mt-0    w-fit text-start pl-2 whitespace-nowrap overflow-hidden text-[0.95rem] text-[#e4e6e7] font-medium">
            NoteStack
          </span>
        )}

        {/* toggle btn */}
        <motion.button
          onClick={handleToggleSidebar}
          className={`absolute  px-2.5 py-2.5 rounded-full -bottom-4 bg-[#1e1f23] hover:bg-[#27282f]  cursor-pointer  z-10 text-xs text-inherit  right-0 translate-x-1/2 `}
        >
          <LuChevronLeft />
        </motion.button>
      </div>
      <div className="w-full h-full flex flex-col justify-between items-start">
        <div
          className={`${
            state ? "mt-[3rem] px-2 " : "px-3 mt-6"
          } flex   w-full items-center   pt-1.5 justify-center flex-col`}
        >
          {!state && (
            <span className=" px-2 text-[0.75rem] font-medium w-full text-left  text-[#a0a6b1]  mb-1.5">
              Menu
            </span>
          )}
          {[
            { path: "/dashboard", title: "dashboard", icon: <LuLayout /> },
            {
              path: "/collections",
              title: "collections",
              icon: <LuFolder />,
              count: data?.noteCollection?.length,
            },
            { path: "/todos", title: "todos", icon: <LuListChecks /> },
            { path: "/blogs", title: "Blogs", icon: <LuEdit3 /> },
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
          {/* <div className="w-full  border-dark-top mt-3"></div> */}
        </div>
        {/* settings buttons */}
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
          {[{ path: "/settings", title: "settings", icon: <LuSettings /> }].map(
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
      </div>
    </motion.div>
  );
};

export default Sidebar;
