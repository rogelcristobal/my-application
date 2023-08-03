import React from "react";
import {
  PiFolderNotch,
  PiLayout,
  PiCheckSquareOffset,
  PiNoteBlank,
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
      } whitespace-nowrap relative pt-[4rem]  h-screen  flex bg-[#171718]  border-dark-right items-center justify-start  flex-shrink-0`}
    >
      <div className="h-full  w-full flex flex-col">
        <div className="w-full h-full   flex flex-col justify-start items-start">
          <div
            className={`${
              state ? " px-0 " : "px-[0.9rem]"
            } flex   w-full items-center mt-2 py-2 justify-center  flex-col`}
          >
            {!state && (
              <span className=" px-2  w-full  text-left  text-[0.775rem]  text-neutral-400/50 font-normal mb-0">
                Menu
              </span>
            )}
            <div className="w-full h-fit flex flex-col space-y-0.5  py-2">
              {[
                { path: "/dashboard", title: "dashboard", icon: <PiLayout /> ,activeClass:`text-white bg-[#2c2c2c]/50 hover:bg-[#2c2c2c]/50`,},

                {
                  path:'/collections',
                  title: "projects ",
                  icon: <PiFolderNotch />,
                  activeClass:`text-white `,
                  initialState:true,
                  loading: currentUserLoading,
                  items: [{title:"notes",count:currentUser?.noteCollections?.length},{title:"todos",}].map((item, id) => (
                    <SidebarLink
                      title={item?.title}
                      path={`/collections/${item?.title}`}
                      key={id}
                      activeClass={`text-white bg-[#2c2c2c]/50 hover:bg-[#2c2c2c]/50`}
                      count={item.count}
                      icon={item?.icon}
                      
                    />
                  )),
                },
                 { path: "/sample", title: "sample", icon: <PiLayout /> ,activeClass:`text-white bg-[#2c2c2c]/50 hover:bg-[#2c2c2c]/50`,},
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
                  initialState={item?.initialState}
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


