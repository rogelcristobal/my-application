import React from "react";
import {
  LuLayoutDashboard,
  LuFolder,
  LuFeather,
  LuChevronLeft,
  LuListChecks,
  LuEdit3,
  LuSettings,
  LuFile
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
      initial={{ width: "16rem" }}
      transition={{ duration: 0.3 }}
      className={`${
        state ? "w-[4rem]" : "w-[16rem]"
      } whitespace-nowrap  relative bg-white   h-full flex  flex-col  items-center justify-start  flex-shrink-0   `}
    >
      <div
        className={`${
          state ? "px-[0.8rem]" : " px-6  "
        } w-full   relative flex view items-center justify-center  pt-8 pb-10   `}
      >
        <div className="view flex-col flex items-center justify-center">
          <div
            className={`view grid cursor-pointer relative rounded-lg p-[0.6rem] place-content-center ${
              state ? "mr-0" : "mr-0"
            }`}
          >
            <LuFeather className="text-[1.3rem] text-[#4c74fc]" />
          </div>
          {!state && (
            <span className="mt-2 relative   w-fit text-start pl-0 whitespace-nowrap overflow-hidden text-[0.925rem]  font-medium">
              NoteStack
              <div></div>
            </span>
          )}
        </div>

        {/* toggle btn */}
        <motion.button
          onClick={handleToggleSidebar}
          className={`absolute  px-2.5 py-2.5 rounded-full -bottom-4   cursor-pointer  z-10 text-xs text-inherit  right-0 translate-x-1/2 `}
        >
          <LuChevronLeft />
        </motion.button>
      </div>
      <div className="w-full h-full flex flex-col justify-between items-start">
        <div
          className={`${
            state ? "mt-[1rem] px-3 " : "px-4 mt-0"
          } flex   w-full items-center   pt-0 justify-center flex-col`}
        >
          {!state && (
            <span className=" px-2 text-[0.7rem] font-medium w-full text-left  uppercase text-[#696e79]  mb-3">
              Menu
            </span>
          )}
          {[
            { path: "/dashboard", title: "dashboard", icon: <LuLayoutDashboard /> },
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
          <div className="w-full  thin-top-divider h-[0.1rem] mt-4"></div>
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
