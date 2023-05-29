import React from "react";
import {
  TbLayoutGrid,
  TbChevronLeft,
  TbEggs,
  TbFolder,
} from "react-icons/tb";

import SidebarLink from "./SidebarLink";
const Sidebar = ({data,loading})=> {
  const [state, setState] = React.useState(false);
  const handleToggleSidebar = () => {
    setState(!state);
  };
  if(!loading){
    console.log(data)
  }
  return (
    <div
      className={`${
        state ? "w-[4.5rem]" : "w-[16rem]"
      } whitespace-nowrap relative thin-right-divider flex flex-col items-center justify-start  flex-shrink-0  h-full pb-4 pt-0`}
    >
      <div
        className={`${
          state ? " justify-center pl-0" : " px-6 justify-start"
        } w-full   relative flex thin-bottom-divider items-center h-fit pb-8 pt-8  `}
      >
        <div
          className={`bg-[#142c4a] grid  rounded-full p-1.5 place-content-center ${
            state ? "mr-0" : "mr-3"
          }`}
        >
          <TbEggs className="text-lg  text-white" />
        </div>
        {!state && (
          <span className="  w-full text-[1rem] font-semibold">
            myProject
          </span>
        )}

        {/* toggle btn */}
        <button
          onClick={handleToggleSidebar}
          className={`absolute thin-box-divider hover:sample p-1.5 rounded-full -bottom-[14.5%] -right-[4%] cursor-pointer bg-white z-10 text-sm text-[#a7aac4] ${
            state ? "-right-[0.8rem]" : "-right-[1rem] "
          }`}
        >
          <TbChevronLeft />
        </button>
      </div>
      {!state && (
        <span className=" text-[0.695rem] font-medium w-full text-left px-4 text-[#00c4c4] mt-6 mb-2">
          CATEGORIES
        </span>
      )}
      <div
        className={`${
          state ? "mt-6 items-center" : "items-start"
        } flex px-4   w-full  justify-start flex-col`}
      >
        <SidebarLink sidebarState={state} title="Dashboard" icon={<TbLayoutGrid/>} initialTrue/>

        <SidebarLink
          sidebarState={state}
          title="Collection"
          icon={<TbFolder/>}
          
        >
          {loading && data?.data.map((item,id)=>(
            <span>{item.collectionTitle}</span>
          ))}
        </SidebarLink>
      </div>
    </div>
  );
};

export default Sidebar;
