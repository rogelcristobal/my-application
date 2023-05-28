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
      className={`flex items-center gap-3.5 rounded-lg  text-[0.775rem] text-left   ${
        initialTrue ? "text-[#2c84fb] bg-neutral-100/50 " : "text-[#a8adb7]"
      } ${
        sidebarState ? " px-[1.2rem] py-2 justify-center" : " px-3 py-2.5"
      } flex-shrink-0   whitespace-nowrap  relative capitalize font-medium mb-2 w-full`}
    >
      <span className="text-[1.2rem]">{icon}</span>
      {!sidebarState && title}
      <div
        className={`${initialTrue ? "h-[80%]" : "h-0"} ${
          sidebarState ? "-right-[1rem]" : "-right-5  "
        } transition-all duration-75 w-[4px] rounded-l-xl absolute  top-1/2 -translate-y-1/2 bg-[#2c84fb]`}
      ></div>
    </button>
    <div className={`w-full ${children?'h-fit':'h-0'} flex flex-col `}>{children}</div>
    </>
  );
};

export default SidebarLink;
