import { MdOutlineSpaceDashboard, MdFolderOpen } from "react-icons/md";
import { FcFolder } from "react-icons/fc";
import {
  FiGrid,
  FiCreditCard,
  FiFolder,
  FiHash,
  FiSettings,
} from "react-icons/fi";
import { motion, useAnimation } from "framer-motion";
import SidebarLink from "./SidebarLink";
import { useSelector } from "react-redux";
// import User from "./User";
// import { useUser } from "@clerk/clerk-react";
const Sidebar = () => {
  const currentUserLoading = useSelector((state) => state.currentUser.loading);
  const currentUser = useSelector((state) => state.currentUser.data);
  const sidebarControl = useAnimation();

  // const handleToggleSidebar = () => {
  //   setState(!state);
  //   if (state) {
  //     sidebarControl.start({ width: "17rem" });
  //   } else {
  //     sidebarControl.start({ width: "4rem" });
  //   }
  // };

  return (
    <motion.div
      animate={sidebarControl}
      className={`w-fit whitespace-nowrap relative z-10 h-screen  flex bg-[#262626] pl-0  items-center justify-start  flex-shrink-0`}
    >
      {/* <div className="w-16 flex-shrink-0 h-full bg-[#1c1e1f] flex flex-col items-center justify-end"></div> */}
      <div className="h-full w-[16rem] pt-[2rem] pb-[2rem] flex flex-col">
        <div className="w-full h-full   flex flex-col justify-start pl-2 items-start">
          {/* <div className="w-full h-12 flex-shrink-0  flex items-center px-[2rem]">
            <span className="font-medium text-[1.1rem] w-full">NoteStack</span>
          </div> */}
          <div
            className={` flex  w-full items-center mt-0 justify-between h-full flex-col`}
          >
            <div className="justify-center h-[calc(100vh-15rem)] overflow-y-scroll px-[0.5rem]  w-full mt-2 flex-col items-center">
              {/* <div className="mb-3 mt-0.5">
                <input
                  type="text"
                  placeholder="Search here"
                  className="input input-bordered  h-10 placeholder:text-[#8d909c]  text-[0.865rem] border-dark placeholder:text-[0.8rem] w-full max-w-xs"
                />
              </div> */}
              <div className="justify-center  mt-1  w-full flex-col items-center">
                <span className=" px-1  w-full  text-left  text-[0.70rem] text-[#A3A3A3] tracking-widest  font-medium uppercase ">
                  Menu
                </span>

                <div className="w-full h-fit  flex flex-col space-y-2   py-2">
                  {[
                    {
                      path: "/dashboard",
                      title: "dashboard",
                      icon: <FiGrid />,
                      activeClass: ` text-[#EEEEEE] bg-[#2e2e2e] hover:bg-[#2e2e2e]`,
                    },
                    // {
                    //   path: "/time-sheet",
                    //   title: "time sheet",
                    //   icon: <PiCalendarCheckBold />,
                    //   activeClass: ` text-[#EEEEEE] bg-[#2e2e2e] hover:bg-[#2e2e2e]`,
                    // },
                    // {
                    //   path: "/pay-summary",
                    //   title: "pay summary",
                    //   icon: <FiCreditCard />,
                    //   activeClass: ` text-[#EEEEEE] bg-[#2e2e2e] hover:bg-[#2e2e2e]`,
                    // },
                  ].map((item, id) => (
                    <SidebarLink
                      key={id}
                      path={item.path}
                      title={item.title}
                      icon={item.icon}
                      count={item?.count}
                      item={item?.items}
                      activeClass={item.activeClass}
                      initialState={item?.initialState}
                      loading={item?.loading}
                    />
                  ))}
                </div>
              </div>
              <div className="justify-center  mt-1  w-full flex-col items-center">
                <span className=" px-1  w-full  text-left  text-[0.70rem] text-[#A3A3A3] tracking-widest font-medium uppercase ">
                  Tools
                </span>

                <div className="w-full h-fit flex flex-col space-y-2  mt-0 py-2">
                  {[
                    {
                      path: "/collections",
                      title: "collections ",
                      icon: <FiFolder />,
                      activeClass: `text-[#EEEEEE] `,
                      initialState: true,
                      attr: "dropdown",
                      items: [
                        { title: "todos", isItem: true },
                        {
                          title: "notes",
                          count: currentUser?.noteCollections?.length,
                          loading: currentUserLoading,
                          isItem: true,
                        },
                      ].map((item, id) => (
                        <SidebarLink
                          title={item?.title}
                          path={`/collections/${item?.title}`}
                          key={id}
                          activeClass={`text-[#EEEEEE] bg-[#2e2e2e] hover:bg-[#2e2e2e] `}
                          count={item.count}
                          icon={item?.icon}
                          loading={item?.loading}
                          isItem={item.isItem}
                        />
                      )),
                    },
                    {
                      path: "/channels",
                      title: "Channels ",
                      icon: <FiHash />,
                      activeClass: `text-[#EEEEEE]  bg-[#2e2e2e] hover:bg-[#2e2e2e]`,

                      initialState: true,
                      // attr: "dropdown",
                      // items: [{}, {}].map((item, id) => (
                      //   <SidebarLink
                      //     title={item?.title}
                      //     path={`/collections/${item?.title}`}
                      //     key={id}
                      //     activeClass={`text-[#EEEEEE] bg-[#2e2e2e] hover:bg-[#2e2e2e]  `}
                      //     count={item.count}
                      //     icon={item?.icon}
                      //     loading={item?.loading}
                      //     isItem={item.isItem}
                      //   />
                      // )),
                    },
                  ].map((item, id) => (
                    <SidebarLink
                      key={id}
                      path={item.path}
                      title={item.title}
                      icon={item.icon}
                      count={item?.count}
                      item={item?.items}
                      activeClass={item.activeClass}
                      initialState={item?.initialState}
                      loading={item?.loading}
                    />
                  ))}
                </div>
              </div>
              <div className="justify-center mt-1  w-full flex-col items-center">
                <span className=" px-1 w-full  text-left  text-[0.70rem] text-[#A3A3A3] tracking-widest font-medium uppercase ">
                  Settings
                </span>

                <div className="w-full h-fit flex flex-col space-y-2  mt-0 py-2">
                  <SidebarLink
                    path="/settings"
                    title="Settings"
                    icon={<FiSettings />}
                    activeClass={`text-[#EEEEEE] bg-[#2e2e2e] hover:bg-[#2e2e2e] `}
                  />
                </div>
              </div>
            </div>

            <div className="justify-center w-full px-[1.2rem] flex-col items-center"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
