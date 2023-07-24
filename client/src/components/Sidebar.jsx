import React from "react";

import {PiFolderNotchBold,  PiLayoutBold,PiCheckSquareOffsetBold } from "react-icons/pi";
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

 
  return (
    <motion.div
      animate={sidebarControl}
      initial={{ width: "16rem" }}
      transition={{ duration: 0.3 }}
      className={`${
        state ? "w-[4rem]" : "w-[16rem]"
      } whitespace-nowrap relative   h-full flex bg-[#ffffff]  border-dark-right items-center justify-start  flex-shrink-0`}
    >
     
      <div className="h-full  w-full flex flex-col">
        <div className="w-full h-full mt-8   flex flex-col justify-start items-start">
          <div
            className={`${
              state ? " px-0 " : "px-[1rem]"
            } flex   w-full items-center mt-8 py-2 justify-center flex-col`}
          >
            {!state && (
              <span className=" px-2  w-full  text-left  text-[0.775rem]  text-[#667085] font-medium mb-2.5">
                Menu
              </span>
            )}
            {[
              { path: "/dashboard", title: "dashboard", icon: <PiLayoutBold /> },
              {
                path: "/collections",
                title: "collections ",
                icon: <PiFolderNotchBold />,
                count: currentUser?.noteCollections?.length,
                loading: currentUserLoading,
                // items:currentUser?.noteCollections
              },
              { path: "/todos", title: "todos", icon: <PiCheckSquareOffsetBold /> },
              // { path: "/blogs", title: "Blogs", icon: <BiEditAlt /> },
            ].map((item, id) => (
              <SidebarLink
                key={id}
                path={item.path}
                sidebarState={state}
                title={item.title}
                icon={item.icon}
                count={item?.count}
                loading={item?.loading}
                item={item?.items}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
