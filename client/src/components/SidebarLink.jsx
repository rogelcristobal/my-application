import React from "react";

const SidebarLink = ({ title, initialTrue, sidebarState,icon,children }) => {
  const [hoverState, setHOverState] = React.useState(false);
  const hoverToggle = () => {
    setHOverState(!hoverState);
  };
  return (
    <>
    <button
      onMouseEnter={hoverToggle}
      onMouseLeave={hoverToggle}
      className={`flex items-center gap-3 rounded-lg t text-[0.825rem] text-left   ${
        initialTrue ? "text-white bg-[#1e1e1e]  border-dark" : "text-[#808088] font-medium"
      } ${
        sidebarState ? " px-[1.2rem] py-2 justify-center" : " px-3 py-3"
      } flex-shrink-0 font-medium   whitespace-nowrap  relative capitalize  mb-2 w-full`}
    >
      <span className="text-[1.1rem] ">{icon}</span>
      {!sidebarState && title}
      <div
        className={`${initialTrue ? "h-[80%]" : "h-0"} ${
          sidebarState ? "-right-[1rem]" : "-right-[1rem]  "
        } transition-all duration-75 w-[3.5px] rounded-l-xl absolute  top-1/2 -translate-y-1/2 bg-[#6360ea]`}
      ></div>
    </button>
    <div className={`w-full ${children?'h-fit':'h-0'} flex flex-col `}>{children}</div>
    </>
  );
};

export default SidebarLink;
