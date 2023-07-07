import React from "react";
import { NavLink } from "react-router-dom";
const SidebarLink = ({ title, sidebarState, loading, icon,count, path }) => {
  const [hoverState, setHOverState] = React.useState(false);
  const hoverToggle = () => {
    setHOverState(!hoverState);
  };

  return (
    <NavLink to={path} role="link" className="w-full mb-0.5  view ">
      {({ isActive }) => (
        <div
          onMouseEnter={hoverToggle}
          onMouseLeave={hoverToggle}
          className={`w-full font-normal rounded-md h-[2.875rem] relative px-4 border-0 box-border  btn-sm btn  ${
            isActive
              ? "text-black  bg-transparent hover:bg-transparent "
              : "text-black bg-transparent hover:bg-transparent "
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
              {/* <span
                className={`text-[1.2rem]   mx-auto ${
                  isActive && ""
                }`}
              >
                {icon}
              </span> */}
              {!sidebarState && (
                <span className="flex items-center   text-start w-full h-full overflow-x-hidden  truncate ">
                  {title}
                </span>
              )}
            </div>
            {loading?
            <span className="text-sm">loading</span>
            :count > 0  && (
              <div className="   view font-inter  rounded-full h-4 grid place-content-center w-4   ">
                {count}
              </div>
            )
            
            }
          </div>

          {/* <div
            className={`${isActive ? "h-[100%]" : "h-0"} ${
              sidebarState ? "left-[0rem]" : "-left-[0.9rem]  "
            } transition-all duration-75 w-[0.2rem] bg-[#8b72ff] rounded-r-xl absolute  top-1/2 -translate-y-1/2 `}
          ></div> */}
        </div>
      )}
    </NavLink>
  );
};

export default SidebarLink;
