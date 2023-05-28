import React from "react";
import {
  TbLayoutGrid,
  TbSettings2,
  TbChevronLeft,
  TbEggs,
  TbFolder,
} from "react-icons/tb";

import SidebarLink from "./SidebarLink";
const Sidebar = () => {
  const [state, setState] = React.useState(false);

  const handleToggleSidebar = () => {
    setState(!state);
  };
  return (
    <div
      className={`${
        state ? "w-[4.5rem]" : "w-[15.5rem]"
      } whitespace-nowrap relative thin-right-divider flex flex-col items-center justify-start  flex-shrink-0 bg-white h-full pb-4 pt-0`}
    >
      <div className={`${state?' justify-center pl-2':' px-8 justify-start'} w-full thin-bottom-divider  relative flex items-center h-fit pb-6 pt-6  `}>
        <div className={`bg-[#20304f] grid mr-3 rounded-full p-1.5 place-content-center ${state?'mr-0':'mr-3'}`}>
          <TbEggs className="text-lg  text-white" />
        </div>
        {!state&&<span className="  w-full text-[0.9rem] font-semibold">myProject</span>}
        <button
          onClick={handleToggleSidebar}
          className={`absolute thin-box-divider hover:sample p-1.5 rounded-full -bottom-[14.5%] -right-[4%] cursor-pointer bg-white z-10 text-sm text-[#a7aac4] ${state?'-right-[17%] ':'-right-[4%] '}`}
        >
          <TbChevronLeft />
        </button>
      </div>
      {!state && (
        <span className=" text-[0.695rem] font-medium w-full text-left px-8 text-[#a8adb7]/70 mt-6 mb-2">
          Categories
        </span>
      )}
      <div
        className={`${
          state ? "mt-6 items-center" :'items-start'
        } flex px-6   w-full  justify-start flex-col`}
      >
        {[
          {
            title: "dashboard",
            icon: <TbLayoutGrid  />,
            initialTrue: true,
          },
          {
            title: "Collections",
            icon: <TbFolder />,
          },
          {
            title: "settings",
            icon: <TbSettings2  />,
          },
        ].map((item, id) => (
          <SidebarLink
            sidebarState={state}
            item={item}
            key={id}
            initialTrue={item.initialTrue ? true : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
