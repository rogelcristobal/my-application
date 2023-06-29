import React from "react";
import { LuListChecks, LuEdit3, LuSettings } from "react-icons/lu";
import { TbFolder, TbLayoutGrid } from "react-icons/tb";
import { motion, useAnimation } from "framer-motion";
import SidebarLink from "./SidebarLink";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { deleteCurrentUserCollection } from "../features/user/currentUserSlice";
const Sidebar = () => {
  const socket = io("http://localhost:3001");
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

  const [collections, setCollections] = React.useState([]);
  React.useEffect(() => {
    if(!currentUserLoading){
      setCollections(currentUser);
    }
  }, [currentUserLoading]);

  React.useEffect(() => {
    // listen to events
    socket.on("deleteNoteCollection", (data) => {
      console.log(collections);
       

      // deleteCurrentUserCollection
      // setUserStates({
      //   ...userStates,
      //   collectionLen: x

      // })
    });
    return () => socket.disconnect();
  }, []);

  return (
    <motion.div
      animate={sidebarControl}
      initial={{ width: "16rem" }}
      transition={{ duration: 0.3 }}
      className={`${
        state ? "w-[4rem]" : "w-[16rem]"
      } whitespace-nowrap  relative  view  h-full flex  flex-col  items-center justify-start  flex-shrink-0`}
    >
      <div
        className={`${
          state ? "px-[0.5rem] " : " px-3  "
        } w-full   relative flex view  items-center justify-start  pt-8 pb-8   `}
      >
        <div className="view flex items-center justify-center">
          <div
            className={`view grid  cursor-pointer relative rounded-lg p-[0.6rem] place-content-center ${
              state ? "mr-0" : "mr-0"
            }`}
          ></div>
          {!state && (
            <span className=" relative   w-fit text-start ml-0.5 whitespace-nowrap overflow-hidden text-sm font-normal">
              app_name
              <div></div>
            </span>
          )}
        </div>

        {/* toggle btn */}
        {/* <motion.button
          onClick={handleToggleSidebar}
          className={`absolute  h-[2.285rem] w-[2.285rem] p-1 view rounded-full -bottom-2   cursor-pointer  z-10 text-xs text-inherit  right-0 translate-x-1/2 `}
        >
          <div className="view rounded-full h-full grid place-content-center w-full">
            <LuChevronLeft />
          </div>
        </motion.button> */}
      </div>
      <div className="w-full h-full  flex flex-col justify-start items-start">
        <div
          className={`${
            state ? " px-0 mt-10" : "px-3 mt-10"
          } flex   w-full items-center view  py-3 justify-center flex-col`}
        >
          {!state && (
            <span className=" px-3 text-[0.8rem] font-medium w-full text-left  Capitalize   mb-2">
              General
            </span>
          )}
          {[
            { path: "/dashboard", title: "dashboard", icon: <TbLayoutGrid /> },
            {
              path: "/collections",
              title: "collections",
              icon: <TbFolder />,
              // count: collections?.noteCollections?.length,
              loading: currentUserLoading,
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
              loading={item?.loading}
            />
          ))}
        </div>
      </div>
      <div
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
      </div>
    </motion.div>
  );
};

export default Sidebar;
