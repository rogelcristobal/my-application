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
        state ? "w-[4rem]" : "w-[15rem]"
      } whitespace-nowrap border-dark-right relative bg-[#1e1f23]  h-full flex  flex-col  items-center justify-start  flex-shrink-0   `}
    >
      <div
      
        className={`${
          state ? " " : "  "
        } w-full   relative flex flex-col items-center justify-start h-32 pb-8 pt-8  `}
      >
        <div
          className={`bg-[#1f2125] grid border-[1px] border-solid border-neutral-600 rounded-full p-[0.7rem] place-content-center ${
            state ? "mr-0" : "mr-0"
          }`}
        >
          <TbEggs className="text-lg  text-white" />
        </div>
        {!state && (
          <span className=" mt-3 w-fit text-[0.8rem] text-white font-medium">
            My Project
          </span>
        )}

        {/* toggle btn */}
        {/* <button
          onClick={handleToggleSidebar}
          className={`absolute hover:sample p-1.5 rounded-full bottom-0   cursor-pointer thin-box-divider z-10 text-sm text-white bg-[#31b6f7] right-0 translate-x-1/2 `}
        >
          <TbChevronLeft />
        </button> */}
      </div>
      {!state && (
        <span className=" text-[0.75rem]  w-full text-left px-5 text-gray-400/70  mt-4 mb-3">
          Menu
        </span>
      )}
      <div
        className={`${
          state ? "mt-11 " : ""
        } flex  px-4 w-full items-center justify-center flex-col`}
      >
        <SidebarLink
          path="/dashboard"
          sidebarState={state}
          title="Dashboard"
          icon={<TbLayoutGrid />}
        />

        <SidebarLink
          sidebarState={state}
          title="Collections"
          icon={<TbFolder />}
          path="/collections"
          count={data?.noteCollection.length}
        ></SidebarLink>
      </div>
    </div>
  );
};

export default Sidebar;
