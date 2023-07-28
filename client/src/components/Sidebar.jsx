import React from "react";

import {PiFolderNotchBold,  PiLayoutBold,PiCheckSquareOffsetBold ,PiNoteBlankBold} from "react-icons/pi";
import { motion, useAnimation } from "framer-motion";
import SidebarLink from "./SidebarLink";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const [state, setState] = React.useState(false);
  const currentUserLoading = useSelector((state) => state.currentUser.loading);
  const currentUser = useSelector((state) => state.currentUser.data);
  const sidebarControl = useAnimation();

  // const handleToggleSidebar = () => {
  //   setState(!state);
  //   if (state) {
  //     sidebarControl.start({ width: "16.5rem" });
  //   } else {
  //     sidebarControl.start({ width: "4rem" });
  //   }
  // };

 
  return (
    <motion.div
      // animate={sidebarControl}
      // initial={{ width: "16.5rem" }}
      // transition={{ duration: 0.3 }}
      className={`${
        state ? "w-[4rem]" : "w-[15.25rem]"
      } whitespace-nowrap relative   h-full  flex bg-[#1d2327] view border-dark-right items-center justify-start  flex-shrink-0`}
    >
     
      <div className="h-full  w-full flex flex-col">
        <div className="w-full h-full   flex flex-col justify-start items-start">
          <div
            className={`${
              state ? " px-0 " : "px-[0.75rem]"
            } flex   w-full items-center mt-16 py-2 justify-center  flex-col`}
          >
            {!state && (
              <span className=" px-2  w-full  text-left  text-[0.775rem]  text-neutral-400/50 font-normal mb-1">
                Menu
              </span>
            )}
            {[
              { path: "/dashboard", title: "dashboard", icon: <PiLayoutBold /> },
              {
                path: "/projects",
                title: "projects ",
                icon: <PiFolderNotchBold />,
                count: currentUser?.noteCollections?.length,
                loading: currentUserLoading,
                items:[{collectionTitle:"my notes"},{collectionTitle:"todos", }]
              },
              // { path: "/todos", title: "todos", },
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
