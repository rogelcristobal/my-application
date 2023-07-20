import React from "react";
import {
  LuListChecks,
  LuArchive,
  LuEdit3,
  LuSettings,
  LuChevronLeft,
} from "react-icons/lu";
import { BiNote, BiLayout, BiListCheck, BiEditAlt } from "react-icons/bi";
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

 
  return (
    <motion.div
      animate={sidebarControl}
      initial={{ width: "16.5rem" }}
      transition={{ duration: 0.3 }}
      className={`${
        state ? "w-[4rem]" : "w-[16.5rem]"
      } whitespace-nowrap relative  view h-full flex  border-dark-right  items-center justify-start  flex-shrink-0`}
    >
     
      <div className="h-full  w-full flex flex-col">
        <div className="w-full h-full mt-0   flex flex-col justify-start items-start">
          <div
            className={`${
              state ? " px-0 " : "px-[1rem]"
            } flex   w-full items-center mt-24 py-2 justify-center flex-col`}
          >
            {!state && (
              <span className=" px-2 font-semibold w-full  text-left  text-[0.8rem]   mb-2">
                Menu
              </span>
            )}
            {[
              { path: "/dashboard", title: "dashboard", icon: <BiLayout /> },
              {
                path: "/collections",
                title: "collections ",
                icon: <BiNote />,
                count: currentUser?.noteCollections?.length,
                loading: currentUserLoading,
                // items: userData?.noteCollections
              },
              // { path: "/todos", title: "todos", icon: <BiListCheck /> },
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
