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
  isItem
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
        className={`w-full  h-fit box-border relative   rounded-md`}
        onClick={handleNavLinkClick}
      >
        <div
          onMouseEnter={hoverToggle}
          onMouseLeave={hoverToggle}
          className={`w-full  rounded-lg  h-[2.5rem] box-border flex flex-col  relative px-3.5  ${
            isActive
              ? `${activeClass} font-normal `
              : "text-[#737373] bg-transparent hover:bg-transparent border-0 font-normal box-border"
          }
          `}
        >
          <div className="flex-shrink-0 h-full  flex justify-between items-center overflow-hidden w-full">
            <div
              className={`flex justify-start items-center   h-full    w-full capitalize gap-2.5 `}
            >
              {/* text-[] */}
              <span
                className={`text-[1rem]   ${
                  isActive ? "text-[#B7A2FC]" : "text-[#737373]"
                }`}
              >
                {icon}
              </span>

              <span className={`flex  items-center mt-0.5 text-start w-full h-fit overflow-x-hidden   ${isItem?'text-[0.8rem]':'text-[0.850rem]'} truncate  `}>
                {title}
              </span>
            </div>
            <span>
              {count > 0 && (
                <div className=" text-[0.675rem]  rounded-full  flex items-center justify-center  text-[#d4d4d4]  font-normal">
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
        {/* {isActive&&<div className={`absolute h-[50%] w-[3px] ${isActive&&'bg-[#3972f7]'} left-[0.1rem]  -translate-y-1/2 top-1/2 rounded-r-[15px]`}></div>} */}
      </NavLink>
    );

    // if link has a children , therefore it renders a dropdown and not a link component
  } else {
    return (
      <div className={`${activeState&&' rounded-md'}`}>
        <div
          role="button"
          tabIndex={0}
          className="w-full  h-fit box-border  rounded-md "
          onClick={handleNavLinkClick}
        >
          <div
            onMouseEnter={hoverToggle}
            onMouseLeave={hoverToggle}
            className={`w-full cursor-pointer rounded-lg  h-[2.5rem] flex flex-col relative px-3.5   ${
              isActive
                ? // bg-[#2c2c2c]/50
                  `${activeClass} font-normal `
                : "text-[#737373] bg-transparent hover:bg-transparent border-0 box-border font-normal "
            }
          `}
          >
            <div className="flex-shrink-0 h-full  flex justify-between items-center overflow-hidden w-full">
              <div
                className={`flex justify-start items-center   h-full    w-full capitalize gap-2.5 `}
              >
                <span
                  className={`text-[1rem]   ${
                    isActive ? "text-[#B7A2FC]" : "text-[#737373]"
                  }`}
                >
                  {icon}
                </span>

                <span className="flex  items-center mt-0.5 text-start w-full h-fit overflow-x-hidden text-[0.850rem]  truncate  ">
                  {title}
                </span>
              </div>

                 {item && (
                <span className="text-[0.8rem] text-[#737373]/70  ">
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
              height: activeState ? 2.875 * 2 + "rem" : 0,
            }}
            className={` pl-[1rem] relative  py-0  w-full items-end justify-center ${
              activeState && " "
            } flex flex-col px-0 overflow-hidden `}
          >
            {item}
          </motion.div>
        )}
      </div>
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
