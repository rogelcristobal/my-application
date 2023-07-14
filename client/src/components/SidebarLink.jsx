import React from "react";
import { NavLink } from "react-router-dom";
const SidebarLink = ({ title, sidebarState, loading, icon,count, path }) => {
  const [hoverState, setHOverState] = React.useState(false);
  const hoverToggle = () => {
    setHOverState(!hoverState);
  };

  return (
    <NavLink to={path} role="link" className="w-full mb-0.5  ">
      {({ isActive }) => (
        <div
          onMouseEnter={hoverToggle}
          onMouseLeave={hoverToggle}
          className={`w-full  rounded-md h-[2.7rem] relative px-4    ${
            isActive
              ? "text-inherit font-medium bg-transparent hover:bg-transparent border-dark"
              : "text-[#676a78] font-medium bg-transparent hover:bg-transparent border-0 box-border"
          }
          ${sidebarState ? "flex justify-center   " : "flex justify-center "}
          `}
        >
          <div className=" h-full flex justify-between items-center overflow-hidden w-full">
            <div
              className={`flex justify-start items-center   h-full    w-full capitalize gap-3 ${
                !sidebarState ? "max-w-[75%] " : "max-w-[100%]"
              }`}
            >
              {/* text-[#004feb] */}
              <span
                className={`text-[1rem]   mx-auto ${
                  isActive && ""
                }`}
              >
                {icon}
              </span>
              {!sidebarState && (
                <span className="flex items-center text-[0.875rem] text-start w-full h-full overflow-x-hidden  truncate ">
                  {title}
                </span>
              )}
            </div>
            {loading?
            <span className="text-sm">loading</span>
            :count > 0  && (
              <div className=" font-medium text-[0.6rem]  rounded-full h-5 grid place-content-center w-5 text-inherit  ">
                {count}
              </div>
            )
            
            }
          </div>

          {/* <div
            className={`${isActive ? "h-[100%]" : "h-0"} ${
              sidebarState ? "left-[0rem]" : "-left-[1rem]  "
            } transition-all duration-75 w-[0.275rem] bg-blue-500 rounded-r-xl absolute  top-1/2 -translate-y-1/2 `}
          ></div> */}
        </div>
      )}
    </NavLink>
  );
};

export default SidebarLink;
