import {
  PiFolderNotch,
  PiHouse,
  PiGear,
  PiCalendarCheck,
  PiCardholder,
} from "react-icons/pi";
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
      className={`w-fit whitespace-nowrap relative z-10  h-screen  flex bg-[#191b1e]   items-center justify-start  flex-shrink-0`}
    >
      {/* <div className="w-16 flex-shrink-0 h-full bg-[#1c1e1f] flex flex-col items-center justify-end"></div> */}
      <div className="h-full w-[17rem] pt-[2rem] pb-[2rem] flex flex-col">
        <div className="w-full h-full   flex flex-col justify-start items-start">
          {/* <div className="w-full h-16  flex items-center px-7">
            <span className="font-normal text-[1.05rem]">NoteStack</span>
          </div> */}
          <div
            className={` flex px-[1.3rem]   w-full items-start mt-6 justify-between h-full flex-col`}
          >
            <div className="justify-center w-full  flex-col items-center">
              <span className=" px-2  w-full  text-left  text-[0.75rem] text-[#454545]  font-medium ">
                Menu
              </span>

              <div className="w-full h-fit flex flex-col space-y-2.5 mt-1.5  py-2">
                {[
                  {
                    path: "/dashboard",
                    title: "dashboard",
                    icon: <PiHouse />,
                    activeClass: ` text-[#d4d4d4] bg-[#27292e] hover:bg-[#27292e]`,
                  },
                  {
                    path: "/time-sheet",
                    title: "time sheet",
                    icon: <PiCalendarCheck />,
                    activeClass: ` text-[#d4d4d4] bg-[#27292e] hover:bg-[#27292e]`,
                  },
                  {
                    path: "/pay-summary",
                    title: "pay summary",
                    icon: <PiCardholder />,
                    activeClass: ` text-[#d4d4d4] bg-[#27292e] hover:bg-[#27292e]`,
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
              <div className="justify-center w-full flex-col mt-2.5 items-center">
                <span className=" px-2  w-full  text-left  text-[0.75rem] text-[#454545] font-medium ">
                  Tools
                </span>

                <div className="w-full h-fit flex flex-col space-y-2  mt-1.5 py-2">
                  {[
                    {
                      path: "/collections",
                      title: "collections ",
                      icon: <PiFolderNotch />,
                      activeClass: `text-[#d4d4d4] `,
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
                          activeClass={`text-inherit bg-[#27292e] hover:bg-[#27292e]  `}
                          count={item.count}
                          icon={item?.icon}
                          loading={item?.loading}
                          isItem={item.isItem}
                        />
                      )),
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
            </div>

            <div className="justify-center w-full flex-col items-center">
              <span className=" px-2  w-full  text-left  text-[0.75rem] text-[#454545] font-medium ">
                Settings
              </span>

              <div className="w-full h-fit flex flex-col space-y-2  mt-1.5 py-2">
                <SidebarLink
                  path="/settings"
                  title="Settings"
                  icon={<PiGear />}
                  activeClass={`text-[#d4d4d4] bg-[#27292e] hover:bg-[#27292e] `}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
