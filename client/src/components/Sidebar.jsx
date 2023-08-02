import React from "react";
import {
  PiFolderNotch,
  PiLayout,
  PiCheckSquareOffsetBold,
  PiNoteBlankBold,
} from "react-icons/pi";
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
      } whitespace-nowrap relative   h-full  flex bg-[#171718]  border-dark-right items-center justify-start  flex-shrink-0`}
    >
      <div className="h-full  w-full flex flex-col">
        <div className="w-full h-full   flex flex-col justify-start items-start">
          <div
            className={`${
              state ? " px-0 " : "px-[0.8rem]"
            } flex   w-full items-center mt-2 py-2 justify-center  flex-col`}
          >
            {!state && (
              <span className=" px-2  w-full  text-left  text-[0.775rem]  text-neutral-400/50 font-normal mb-2">
                Menu
              </span>
            )}
            <div className="w-full h-fit flex flex-col space-y-1">
              {[
                { path: "/dashboard", title: "dashboard", icon: <PiLayout /> ,activeClass:`text-white bg-[#2c2c2c]/50 hover:bg-[#2c2c2c]/50`,},

                {
                  path:'/collections',
                  title: "projects ",
                  icon: <PiFolderNotch />,
                  activeClass:`text-white bg-[#2c2c2c]/50 hover:bg-[#2c2c2c]/50`,
                  // count: currentUser?.noteCollections?.length,
                  loading: currentUserLoading,
                  items: [{title:"notes",count:currentUser?.noteCollections?.length},{title:"todos"}].map((item, id) => (
                    <SidebarLink
                      title={item?.title}
                      path={`/collections/${item?.title}`}
                      key={id}
                      activeClass={`text-white`}
                      count={item.count}
                      
                    />
                  )),
                },
               
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
                  activeClass={item.activeClass}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
