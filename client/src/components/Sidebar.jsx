import {
  PiFolderNotchBold,
  PiHouseBold,
  PiGearBold,
  PiHashBold,
  PiCardholderBold,
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
      className={`w-fit whitespace-nowrap relative z-10  h-screen  flex bg-[#191b1f]   items-center justify-start  flex-shrink-0`}
    >
      {/* <div className="w-16 flex-shrink-0 h-full bg-[#1c1e1f] flex flex-col items-center justify-end"></div> */}
      <div className="h-full w-[16.75rem] pt-[2rem] pb-[2rem] flex flex-col">
        <div className="w-full h-full   flex flex-col justify-start items-start">
          {/* <div className="w-full h-16  flex items-center px-7">
            <span className="font-normal text-[1.05rem]">NoteStack</span>
          </div> */}
          <div
            className={` flex px-[1.2rem]   w-full items-start mt-6 justify-between h-full flex-col`}
          >
            <div className="justify-center w-full mt-2 flex-col items-center">
              <span className=" px-1  w-full  text-left  text-[0.75rem] text-[#454545]  font-medium ">
                Menu
              </span>

              <div className="w-full h-fit  flex flex-col space-y-2 mt-1  py-2">
                {[
                  {
                    path: "/dashboard",
                    title: "dashboard",
                    icon: <PiHouseBold />,
                    activeClass: ` text-[#d4d4d4] bg-[#27292e]/40 hover:bg-[#27292e]/40`,
                  },
                  // {
                  //   path: "/time-sheet",
                  //   title: "time sheet",
                  //   icon: <PiCalendarCheckBold />,
                  //   activeClass: ` text-[#d4d4d4] bg-[#27292e]/40 hover:bg-[#27292e]/40`,
                  // },
                  {
                    path: "/pay-summary",
                    title: "pay summary",
                    icon: <PiCardholderBold />,
                    activeClass: ` text-[#d4d4d4] bg-[#27292e]/40 hover:bg-[#27292e]/40`,
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
              <div className="justify-center  w-full flex-col mt-2 items-center">
                <span className=" px-1  w-full  text-left  text-[0.75rem] text-[#454545] font-medium ">
                  Tools
                </span>

                <div className="w-full h-fit flex flex-col space-y-2  mt-0 py-2">
                  {[
                    {
                      path: "/collections",
                      title: "collections ",
                      icon: <PiFolderNotchBold />,
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
                          activeClass={`text-[#d4d4d4] bg-[#27292e]/40 hover:bg-[#27292e]/40  `}
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
                      icon: <PiHashBold />,
                      activeClass: `text-[#d4d4d4] `,
                      initialState: true,
                      attr: "dropdown",
                      items: [{}, {}].map((item, id) => (
                        <SidebarLink
                          title={item?.title}
                          path={`/collections/${item?.title}`}
                          key={id}
                          activeClass={`text-[#d4d4d4] bg-[#27292e]/40 hover:bg-[#27292e]/40  `}
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
              <span className=" px-1  w-full  text-left  text-[0.75rem] text-[#454545] font-medium ">
                Settings
              </span>

              <div className="w-full h-fit flex flex-col space-y-2  mt-0 py-2">
                <SidebarLink
                  path="/settings"
                  title="Settings"
                  icon={<PiGearBold />}
                  activeClass={`text-[#d4d4d4] bg-[#27292e]/40 hover:bg-[#27292e]/40 `}
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
