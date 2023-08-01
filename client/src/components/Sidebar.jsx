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
      sidebarControl.start({ width: "15rem" });
    } else {
      sidebarControl.start({ width: "4rem" });
    }
  };

  return (
    <motion.div
      animate={sidebarControl}
      initial={{ width: "15rem" }}
      transition={{ duration: 0.3 }}
      className={`${
        state ? "w-[4rem]" : "w-[15rem]"
      } whitespace-nowrap relative   h-full  flex bg-[#171718]  border-dark-right items-center justify-start  flex-shrink-0`}
    >
      <div className="h-full  w-full flex flex-col">
        <div className="w-full h-full   flex flex-col justify-start items-start">
          <div
            className={`${
              state ? " px-0 " : "px-[0.75rem]"
            } flex   w-full items-center mt-5 py-2 justify-center  flex-col`}
          >
            {!state && (
              <span className=" px-2  w-full  text-left  text-[0.775rem]  text-neutral-400/50 font-normal mb-2">
                Menu
              </span>
            )}
            <div className="w-full h-fit flex flex-col space-y-1.5">
              {[
                { path: "/dashboard", title: "dashboard", icon: <PiLayout /> },

                {
                  title: "projects ",
                  icon: <PiFolderNotch />,
                  count: currentUser?.noteCollections?.length,
                  loading: currentUserLoading,
                  items: currentUser?.noteCollections?.map((item, id) => (
                    <SidebarLink
                      title={item?.collectionTitle}
                      path={`/${item?.collectionTitle}`}
                      icon={item?.icon}
                      key={id}
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
