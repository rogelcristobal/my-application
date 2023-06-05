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
    <NavLink
      to={path}
      role="link"
      className="w-full flex justify-center "
    >
      {({ isActive }) => (
        <div
          onMouseEnter={hoverToggle}
          onMouseLeave={hoverToggle}
          className={`btn btn-sm   flex items-start  font-normal border-0  rounded-lg text-[0.8rem] text-center   ${
            isActive
              ? "  text-white bg-[#292a30] hover:bg-[#292a30] "
              : "text-gray-400/70 bg-transparent  "
          } ${
            sidebarState
              ? " h-[2.7rem] w-[2.6rem] justify-center"
              : " px-4 py-[1.5rem] justify-between"
          } flex-shrink-0   whitespace-nowrap  relative capitalize   w-full`}
        >
          <div className="flex items-center  w-full  h-full">
            <div className={`w-full  h-full flex items-center  ${!sidebarState?'justify-start gap-2.5':'justify-center'}`}>
              <span className="text-[1rem] ">{icon}</span>
              <span className="pt-0.5 overflow-hidden">{!sidebarState && title}</span>
            </div>
            <div>
              {!sidebarState && count && (
                <span className={` text-[#fbfdfd]/60 lowercase  badge bg-transparent border-0 badge-xs rounded-full  px-1 py-1.5 text-[0.7rem] font-helveticaRegular `}>
                  {count} new
                </span>
              )}
            </div>
          </div>

          <div
            className={`${isActive ? "h-[80%]" : "h-0"} ${
              sidebarState ? "-left-[0.6rem]" : "-left-[0.6rem]  "
            } transition-all duration-75 w-[3px] rounded-r-xl absolute  top-1/2 -translate-y-1/2 bg-[#486de9]`}
          ></div>
        </div>
      )}
    </NavLink>
  );
};

export default SidebarLink;
