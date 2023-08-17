import React from "react";
import PropTypes from "prop-types";
import { PiCaretDownBold } from "react-icons/pi";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const SidebarLink = ({
  title,
  initialState,

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
        className="w-full   h-fit box-border relative"
        onClick={handleNavLinkClick}
      >
        <div
          onMouseEnter={hoverToggle}
          onMouseLeave={hoverToggle}
          className={`w-full  rounded-md h-[2.4rem] box-border flex flex-col font-normal relative px-3  ${
            isActive
              ? `${activeClass}  `
              : "text-[#999999]  bg-transparent hover:bg-transparent border-0 box-border"
          }
          `}
        >
          <div className="flex-shrink-0 h-full  flex justify-between items-center overflow-hidden w-full">
            <div
              className={`flex justify-start items-center   h-full    w-full capitalize gap-3 `}
            >
              {/* text-[] */}
              <span
                className={`text-[1rem]   ${
                  isActive ? "text-[#918cf2]" : "text-[#999999]/70"
                }`}
              >
                {icon}
              </span>

              <span className="flex  items-center mt-0.5 text-start w-full h-fit overflow-x-hidden text-[0.85rem] font-normal  truncate ">
                {title}
              </span>
            </div>
            <span>
              {count > 0 && (
                <div className=" text-[0.7rem]  rounded-md h-[1.2rem] w-[1.2rem] pt-0.5 flex items-center justify-center  text-[#999999]/70   font-normal">
                  <span>{count}</span>
                </div>
              )}
            </span>

            {item && (
              <span className="text-[0.675rem] text-[#999999]/70  ">
                <PiCaretDownBold
                  className={`${!activeState && "-rotate-90"}`}
                />
              </span>
            )}
          </div>
        </div>

        {/* {isItem&&<div className={`${isActive?'bg-[#676269]/50 h-[90%]':'h-0'} transition-all duration-100 ease-in-out   w-[1.5px] z-10 absolute -left-[0.7rem] top-1/2 -translate-y-1/2`}></div>} */}
      </NavLink>
    );

    // if link has a children , therefore it renders a dropdown and not a link component
  } else {
    return (
      <>
        <div
          role="button"
          tabIndex={0}
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
                : "text-[#999999]  bg-transparent hover:bg-transparent border-0 box-border"
            }
          `}
          >
            <div className="flex-shrink-0 h-full  flex justify-between items-center overflow-hidden w-full">
              <div
                className={`flex justify-start items-center   h-full    w-full capitalize gap-3 `}
              >
                {/* text-[#004feb] */}
                <span
                  className={`text-[1rem]   ${
                    isActive ? "text-[#918cf2]" : "text-[#999999]/70"
                  }`}
                >
                  {icon}
                </span>

                <span className="flex  items-center mt-0.5 text-start w-full h-fit overflow-x-hidden text-[0.85rem]  truncate ">
                  {title}
                </span>
              </div>

              {item && (
                <span className="text-[0.75rem] text-[#666666]  ">
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
            className={` pl-[1.1rem] relative    w-full items-center justify-between ${
              activeState && "mt-1.5 "
            } flex flex-col px-0 overflow-hidden `}
          >
            {item}
            {/* <div className="absolute w-[1.5px] h-full top-0 left-4 bg-[#676269]/10"></div> */}
          </motion.div>
        )}
      </>
    );
  }
};

SidebarLink.propTypes = {
  title: PropTypes.string,
  initialState: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.node,
  count: PropTypes.number,
  path: PropTypes.string,
  item: PropTypes.node,
  activeClass: PropTypes.string,
};

export default SidebarLink;
