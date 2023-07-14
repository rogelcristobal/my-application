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
import SocketContext from "../context/SocketContext";
import { QueryClient } from "@tanstack/react-query";
const Sidebar = () => {
  const { socket } = React.useContext(SocketContext);
  const [state, setState] = React.useState(false);
  const currentUserLoading = useSelector((state) => state.currentUser.loading);
  const currentUser = useSelector((state) => state.currentUser.data);
  const sidebarControl = useAnimation();
  const queryClient = new QueryClient();
  const handleToggleSidebar = () => {
    setState(!state);
    if (state) {
      sidebarControl.start({ width: "20rem" });
    } else {
      sidebarControl.start({ width: "4rem" });
    }
  };

  // stores the collection id array
  const [userData, setUserData] = React.useState([]);
  React.useEffect(() => {
    if (currentUser?._id) {
      setUserData(currentUser?.noteCollections);
      queryClient.invalidateQueries("userData");
    }
  }, [currentUser, currentUserLoading]);

  React.useEffect(() => {
    socket.on("deleteNoteCollection", (data) => {
      setUserData((prev) => prev?.filter((c) => c._id !== data._id));
    });
    socket.on("addNoteCollection", (data) => {
      setUserData((prevCollections) => [...prevCollections, data]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  // if(userData.length != 0){
  //   console.log("component", userData)
  // }

  return (
    <motion.div
      animate={sidebarControl}
      initial={{ width: "20rem" }}
      transition={{ duration: 0.3 }}
      className={`${
        state ? "w-[4rem]" : "w-[20rem]"
      } whitespace-nowrap bg-[#ffffff] relative  view h-full flex  border-dark-right  items-center justify-start  flex-shrink-0`}
    >
      {/* <div
        className={`w-full  bg-red-100 relative flex   items-center justify-start   h-[4.7rem]   `}
      >
        <div className=" flex items-center justify-center">
          
        </div>

      </div> */}

      <div className="w-16 h-full flex-shrink-0 border-dark-right view"></div>
      <div className="h-full  w-full flex flex-col">
        <div className="w-full h-full mt-16   flex flex-col justify-start items-start">
          <div
            className={`${
              state ? " px-0 " : "px-[1rem]"
            } flex   w-full items-center mt-2   py-4 justify-center flex-col`}
          >
            {!state && (
              <span className=" px-4 text-[0.75rem] text-[#9d9ea5] font-medium w-full  text-left  Capitalize   mb-2">
                Menu
              </span>
            )}
            {[
              { path: "/dashboard", title: "dashboard", icon: <BiLayout /> },
              {
                path: "/collections",
                title: "Collections",
                icon: <BiNote />,
                count: userData?.length,
                loading: currentUserLoading,
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
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
