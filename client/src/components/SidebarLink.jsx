import React from "react";
import { NavLink, useLocation } from "react-router-dom";
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
  const [activeState, setActiveState] = React.useState(false);
  const hoverToggle = () => {
    setHOverState(!hoverState);
  };
  const sample=()=>{
    alert('asd')
  }

  return (
    <>
      <NavLink to={path} role="link" className="w-full   h-fit">
        {({ isActive }) => {
          
          return (
            <div
              onMouseEnter={hoverToggle}
              onMouseLeave={hoverToggle}
              className={`w-full  rounded-md h-[2.5rem] flex flex-col border-0 box-border relative px-4 ${
                isActive
                  ? "text-white  bg-[#353e44]/50 hover:bg-[#353e44]/50  font-normal "
                  // ? "text-white  bg-transparent hover:bg-transparent view font-normal "
                  : "text-neutral-400/80  bg-transparent hover:bg-transparent    font-normal"
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
                      isActive ? "text-white" : "text-neutral-400/80"
                    }`}
                  >
                    {icon}
                  </span>
                  {!sidebarState && (
                    <span className="flex items-center mt-0.5 text-start w-full h-fit overflow-x-hidden text-[0.8rem]  truncate ">
                      {title}
                        {/* {String(isActive)} */}
                    </span>
                  )}
                </div>
                {loading ? (
                  <span className="text-sm">loading</span>
                ) : (
                  count > 0 && (
                    <div className=" text-[0.6rem]  rounded-md h-[1.2rem] w-[1.2rem] pt-0.5 flex items-center justify-center  text-neutral-400/80  font-medium">
                      <span>{count}</span>
                    </div>
                  )
                )}

               
              </div>

              {/* <div
            className={`${isActive ? "h-[100%]" : "h-0"} ${
              sidebarState ? "left-[0rem]" : "left-[0rem]  "
            } transition-all duration-75 w-[0.2rem] bg-[#1b55ff] rounded-r-xl absolute  top-1/2 -translate-y-1/2 `}
          ></div> */}
            </div>
          );
        }}
      </NavLink>

      {item && (
        <div className={`h-fit pl-[0.9rem] w-full flex flex-col px-0 ${activeState&&'bg-red-100'}`}>
          {item.map((item, id) => (
            <SidebarLink
              title={item?.collectionTitle}
              path={`/${item?.collectionTitle}`}
              icon={item?.icon}
              key={id}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default SidebarLink;
