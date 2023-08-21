import { PiFolderNotch, PiLayout, PiToolbox, PiGear } from "react-icons/pi";
import { motion, useAnimation } from "framer-motion";
import SidebarLink from "./SidebarLink";
import { useSelector } from "react-redux";
import User from "./User";
import { useUser } from "@clerk/clerk-react";
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
      className={`w-[16.5rem] xl:w-[17rem] whitespace-nowrap relative z-10  h-screen  flex bg-[#191b1e]   items-center justify-start  flex-shrink-0`}
    >
      <div className="h-full w-full pt-[2rem] pb-[2rem] flex flex-col">
        <div className="w-full h-full   flex flex-col justify-start items-start">
          {/* <div className="w-full h-16  flex items-center px-7">
            <span className="font-normal text-[1.05rem]">NoteStack</span>
          </div> */}
          <div
            className={` flex px-[1.2rem]   w-full items-start mt-3 justify-between h-full flex-col`}
          >
            <div className="justify-center w-full  flex-col items-center">
              <span className=" px-2  w-full  text-left  text-[0.75rem] text-[#454545]  font-medium ">
                Menu
              </span>

              <div className="w-full h-fit flex flex-col space-y-2 mt-2  py-2">
                {[
                  {
                    path: "/dashboard",
                    title: "dashboard",
                    icon: <PiLayout />,
                    activeClass: ` text-[#cecece] bg-[#27292e] hover:bg-[#27292e]`,
                  },

                  {
                    path: "/collections",
                    title: "collections ",
                    icon: <PiFolderNotch />,
                    activeClass: `text-[#cecece] `,
                    initialState: true,
                    attr: "dropdown",
                    items: [
                      {
                        title: "notes",
                        count: currentUser?.noteCollections?.length,
                        loading: currentUserLoading,
                        isItem: true,
                      },
                      { title: "todos", isItem: true },
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
                  {
                    path: "/Tools",
                    title: "tools",
                    icon: <PiToolbox />,
                    activeClass: `text-[#cecece] bg-[#27292e] hover:bg-[#27292e] `,
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
            <div className="justify-center w-full flex-col items-center">
              <span className=" px-2  w-full  text-left  text-[0.75rem] text-[#454545] font-medium ">
                Settings
              </span>

              <div className="w-full h-fit flex flex-col space-y-2  mt-2 py-2">
                <SidebarLink
                  path="/settings"
                  title="Settings"
                  icon={<PiGear />}
                  activeClass={`text-[#cecece] bg-[#27292e] hover:bg-[#27292e] `}
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
