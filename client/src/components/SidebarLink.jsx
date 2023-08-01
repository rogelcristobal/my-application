import React from "react";
import { PiCaretDownBold } from "react-icons/pi";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
const SidebarLink = ({
  title,
  sidebarState,
  loading,
  icon,
  count,
  path,
  item,
}) => {
  const [hoverState, setHOverState] = React.useState(false);
  const [activeState, setActiveState] = React.useState(true);
  const hoverToggle = () => {
    setHOverState(!hoverState);
  };
  const sample = () => {
    alert("asd");
  };

  if (path) {
    return (
      <>
        <NavLink to={path} role="link" className="w-full  mb-1 h-fit" onClick={(e)=>e.stopPropagation()}>
          {({ isActive }) => {
            if (isActive) {
              setActiveState(true);
            } else {
              setActiveState(false);
            }
            return (
              <div
                onMouseEnter={hoverToggle}
                onMouseLeave={hoverToggle}
                className={`w-full  rounded-md h-[2.4rem] flex flex-col  relative px-4 border-0 box-border ${
                  isActive
                    ? "text-white bg-[#2c2c2c]/50 hover:bg-[#2c2c2c]/50  font-normal "
                    : "text-[#707070]  bg-transparent hover:bg-transparent    font-normal"
                }
          ${sidebarState ? "flex justify-center   " : "flex justify-center "}
          `}
              >
                <div className="flex-shrink-0 h-full  flex justify-between items-center overflow-hidden w-full">
                  <div
                    className={`flex justify-start items-center   h-full    w-full capitalize gap-3 ${
                      !sidebarState ? "max-w-[75%] " : "max-w-[100%]"
                    }`}
                  >
                    {/* text-[#004feb] */}
                    <span
                      className={`text-[1rem]   ${
                        isActive ? "text-[#4595d0]" : ""
                      }`}
                    >
                      {icon}
                    </span>
                    {!sidebarState && (
                      <span className="flex  items-center mt-0.5 text-start w-full h-fit overflow-x-hidden text-[0.825rem]  truncate ">
                        {title} 
                      </span>
                    )}
                  </div>
                  {loading ? (
                    <span className="text-sm">loading</span>
                  ) : (
                    count > 0 && (
                      <div className=" text-[0.6rem]  rounded-md h-[1.2rem] w-[1.2rem] pt-0.5 flex items-center justify-center  text-[#676269]  font-medium">
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
            );
          }}
        </NavLink>
      </>
    );
  } else {
    return (
      <div
        className="w-full  cursor-pointer"
        onMouseEnter={hoverToggle}
        onMouseLeave={hoverToggle}
        onClick={() => setActiveState(!activeState)}
      >
        <div className="w-full  mb-1 w h-fit">
          <div
            className={`w-full  rounded-md h-[2.4rem] flex flex-col  relative px-4 border-0 box-border ${
              activeState
                ? "text-white bg-transparent hover:bg-transparent  font-normal "
                : "text-[#707070]  bg-transparent hover:bg-transparent    font-normal"
            }
          `}
          >
            <div className="flex-shrink-0 h-full  flex justify-between items-center overflow-hidden w-full">
              <div
                className={`flex justify-start items-center   h-full    w-full capitalize gap-3 `}
              >
                <span
                  className={`text-[1rem]   ${
                    activeState ? "text-[#4595d0]" : ""
                  }`}
                >
                  {icon}
                </span>
                <span className="flex  items-center mt-0.5 text-start w-full h-fit overflow-x-hidden text-[0.825rem]  truncate ">
                  {title} 
                </span>
              </div>

              {loading ? (
                <span className="text-sm">loading</span>
              ) : (
                count > 0 && (
                  <div className=" text-[0.6rem]  rounded-md h-[1.2rem] w-[1.2rem] pt-0.5 flex items-center justify-center  text-[#676269]  font-medium">
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

        <motion.div
          initial={{
            height: 0,
          }}
          animate={{
            height: activeState ? 2.70 * count + "rem" : 0,
          }}
          className={` pl-2.5 w-full items-center justify-center ${activeState&&'view'} flex flex-col px-0 overflow-hidden `}
        >
          {item}
        </motion.div>
      </div>
    );
  }
};

export default SidebarLink;
