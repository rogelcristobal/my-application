import React from "react";
import { NavLink } from "react-router-dom";
const SidebarLink = ({
  title,

  sidebarState,
  icon,
  count,
  path,
}) => {
  const [hoverState, setHOverState] = React.useState(false);
  const hoverToggle = () => {
    setHOverState(!hoverState);
  };

  return (
    <NavLink to={path}  role="link" className="w-full  mb-2.5">
      {({ isActive }) => (
        <div
          onMouseEnter={hoverToggle}
          onMouseLeave={hoverToggle}
          className={`flex items-center  rounded-lg text-[0.775rem] text-left   ${
            isActive
              ? "text-white bg-[#292929]/70 "
              : "text-[#757575]/70 font-medium "
          } ${
            sidebarState ? " px-3 py-[0.65rem] justify-center" : " px-3 py-3 justify-between"
          } flex-shrink-0   whitespace-nowrap  relative capitalize   w-full`}
        >
          <div className="flex items-center gap-2.5 h-full">
            <span className="text-[1rem] ">{icon}</span>
            {!sidebarState && title}


          </div>
           {!sidebarState&& count&&  <span className="text-[#757575]/70  font-helveticaRegular">{count}</span>} 
          <div
            className={`${isActive ? "h-[80%]" : "h-0"} ${
              sidebarState ? "-right-[1rem]" : "-right-[1rem]  "
            } transition-all duration-75 w-[3.5px] rounded-l-xl absolute  top-1/2 -translate-y-1/2 bg-[#6360ea]`}
          ></div>
        </div>
      )}
    </NavLink>
  );
};

export default SidebarLink;
