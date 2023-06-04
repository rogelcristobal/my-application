import React from "react";
import { TbLayoutGrid, TbChevronLeft, TbEggs, TbFolder } from "react-icons/tb";
import NoteCollectionContext from "../context/NoteCollectionContext";
import SidebarLink from "./SidebarLink";
import AuthContext from "../context/AuthContext";
const Sidebar = () => {
  const [state, setState] = React.useState(false);
  const{data,userLoading} = React.useContext(AuthContext)
  const handleToggleSidebar = () => {
    setState(!state);
  };

  // const { data, isLoading } = React.useContext(NoteCollectionContext);
  // if (!isLoading) {
  //   console.log(data.data);

  // }
  return (
    <div
      className={`${
        state ? "w-[4.5rem]" : "w-[16rem]"
      } whitespace-nowrap relative  bg-neutral-800/30 flex flex-col items-center justify-start  flex-shrink-0  h-full pb-4 pt-0`}
    >
      <div
        className={`${
          state ? " justify-center pl-0" : " px-4 justify-start"
        } w-full   relative flex items-center h-fit pb-8 pt-8  `}
      >
        <div
          className={`bg-[#6360ea] grid  rounded-full p-[0.5rem] place-content-center ${
            state ? "mr-0" : "mr-3"
          }`}
        >
          <TbEggs className="text-lg  text-white" />
        </div>
        {!state && (
          <span className="  w-full text-[0.8rem] text-white font-semibold">
            myProject v.1
          </span>
        )}

        {/* toggle btn */}
        <button
          onClick={handleToggleSidebar}
          className={`absolute hover:sample p-1.5 rounded-full -bottom-[14.5%]  cursor-pointer bg-[#292929] z-10 text-sm text-[#808088] hover:text-white right-0 translate-x-1/2 `}
        >
          <TbChevronLeft />
        </button>
      </div>
      {!state && (
        <span className=" text-xs font-medium w-full text-left px-5 text-[#808088]/80  mt-6 mb-3">
          Categories
        </span>
      )}
      <div
        className={`${
          state ? "mt-12 items-center" : "items-start"
        } flex px-4   w-full  justify-start flex-col`}
      >
        <SidebarLink
          path="/dashboard"
          sidebarState={state}
          title="Dashboard"
          icon={<TbLayoutGrid />}
        />

        <SidebarLink
          sidebarState={state}
          title="Collection"
          icon={<TbFolder />}
          path="/collections"
          count={data?.user?.noteCollections.length}
        ></SidebarLink>
      </div>
    </div>
  );
};

export default Sidebar;
