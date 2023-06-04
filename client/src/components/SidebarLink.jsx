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
    <NavLink to={path}  role="link" className="w-full flex justify-center ">
      {({ isActive }) => (
        <div
          onMouseEnter={hoverToggle}
          onMouseLeave={hoverToggle}
          className={`flex items-center  font-medium  rounded-lg text-[0.75rem] text-left mb-1  ${
            isActive
              ? "  text-white"
              : "text-neutral-500 "
          } ${
            sidebarState ? " h-[2.6rem] w-[2.6rem] justify-center" : " px-3 py-3 justify-between"
          } flex-shrink-0   whitespace-nowrap  relative capitalize   w-full`}
        >
          <div className="flex items-center gap-2.5 h-full">
            <span className="text-[1rem] ">{icon}</span>
            {!sidebarState && title}


          </div>
           {!sidebarState&& count&&  <span className="text-[#757575]/50    font-helveticaRegular">{count}</span>} 
          <div
            className={`${isActive ? "h-[80%]" : "h-0"} ${
              sidebarState ? "-left-[0.5rem]" : "-left-[0.5rem]  "
            } transition-all duration-75 w-[3.5px] rounded-r-xl absolute  top-1/2 -translate-y-1/2 bg-[#486de9]`}
          ></div>
        </div>
      )}
    </NavLink>
  );
};

export default SidebarLink;
