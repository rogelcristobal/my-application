import React from "react";
import { PiCaretDownBold } from "react-icons/pi";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
const SidebarLink = ({
  title,
  initialState,
  loading,
  icon,
  count,
  path,
  item,
  activeClass,
}) => {
  const [hoverState, setHOverState] = React.useState(false);
  const hoverToggle = () => {
    setHOverState(!hoverState);
  };
  const [activeState, setActiveState] = React.useState(initialState);
  const location = useLocation();

  // Check if the NavLink is active
  const isActive = location.pathname.startsWith(path);

  const handleNavLinkClick = (e) => {
    e.stopPropagation;
    setActiveState(!activeState);
  };

  if (!item) {
    return (
      <NavLink
        to={path}
        role="link"
        className="w-full  mb-0.5 h-fit box-border"
        onClick={handleNavLinkClick}
       
      >
        <div
          onMouseEnter={hoverToggle}
          onMouseLeave={hoverToggle}
          className={`w-full  rounded-md h-[2.4rem] box-border flex flex-col font-normal relative px-3  ${
            isActive
              ? // bg-[#2c2c2c]/50
                activeClass
              : "text-gray-500  bg-transparent hover:bg-transparent border-0 box-border"
          }
          `}
        >
          <div className="flex-shrink-0 h-full  flex justify-between items-center overflow-hidden w-full">
            <div
              className={`flex justify-start items-center   h-full    w-full capitalize gap-3 `}
            >
              {/* text-[#8f6afc] */}
              <span
                className={`text-[1.1rem]   ${isActive ? "text-[#8f6afc]" : ""}`}
              >
                {icon}
              </span>

              <span className="flex  items-center mt-0.5 text-start w-full h-fit overflow-x-hidden text-[0.85rem]  truncate ">
                {title} 
              </span>
            </div>
            {loading ? (
              <span className="text-sm">loading</span>
            ) : (
              count > 0 && (
                <div className=" text-[0.6rem]  rounded-md h-[1.2rem] w-[1.2rem] pt-0.5 flex items-center justify-center  text-[#676269]  font-normal">
                  <span>{count}</span>
                </div>
              )
            )}

            {item && (
              <span className="text-[0.675rem] text-[#676269] ">
                <PiCaretDownBold
                  className={`${!activeState && "-rotate-90"}`}
                />
              </span>
            )}
          </div>
        </div>
      </NavLink>
    );
  } else {
    return (
      <div className="">
        <div
          role="link"
          className="w-full   h-fit box-border"
          onClick={handleNavLinkClick}
        >
          <div
            onMouseEnter={hoverToggle}
            onMouseLeave={hoverToggle}
            className={`w-full cursor-pointer rounded-md h-[2.4rem] flex flex-col font-normal relative px-3   ${
              isActive
                ? // bg-[#2c2c2c]/50
                  activeClass
                : "text-gray-500  bg-transparent hover:bg-transparent border-0 box-border"
            }
          `}
          >
            <div className="flex-shrink-0 h-full  flex justify-between items-center overflow-hidden w-full">
              <div
                className={`flex justify-start items-center   h-full    w-full capitalize gap-3 `}
              >
                {/* text-[#004feb] */}
                <span
                  className={`text-[1.1rem]   ${
                    isActive ? "text-[#8f6afc]" : ""
                  }`}
                >
                  {icon}
                </span>

                <span className="flex  items-center mt-0.5 text-start w-full h-fit overflow-x-hidden text-[0.85rem]  truncate ">
                  {title}
                </span>
              </div>
              {loading ? (
                <span className="text-sm">loading</span>
              ) : (
                count > 0 && (
                  <div className=" text-[0.6rem]  rounded-md h-[1.2rem] w-[1.2rem] pt-0.5 flex items-center justify-center  text-[#676269]  font-normal">
                    <span>{count}</span>
                  </div>
                )
              )}

              {item && (
                <span className="text-[0.675rem] text-[#676269] ">
                  <PiCaretDownBold
                    className={`${!activeState && "-rotate-90"}`}
                  />
                </span>
              )}
            </div>
          </div>
        </div>

        {item && (
          <motion.div
            initial={{
              height: 0,
            }}
            // 2.60 * 2 + "rem"
            animate={{
              height: activeState ? 2.75 * 2 + "rem" : 0,
            }}
            className={` pl-[1.7rem] relative  my-0.5 w-full items-center justify-between ${
              activeState && ""
            } flex flex-col px-0 overflow-hidden `}
          >
            {item}
            <div className="absolute w-[2px] h-full top-0 left-4 bg-[#676269]/10"></div>
          </motion.div>
        )}
      </div>
    );
  }
};

export default SidebarLink;
