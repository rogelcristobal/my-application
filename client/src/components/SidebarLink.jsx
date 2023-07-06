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
          className={`w-full font-normal rounded h-[2.35rem] relative  border-0 box-border  btn-sm btn  ${
            isActive
              ? "text-white bg-[#23272c] hover:bg-[#23272c] "
              : "text-[#9ea0a2] bg-transparent hover:bg-transparent"
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
                className={`text-[1rem]   mx-auto ${
                  isActive && ""
                }`}
              >
                {icon}
              </span> */}
              {!sidebarState && (
                <span className="flex items-center text-[0.8rem]   text-start w-full h-full overflow-x-hidden  truncate ">
                  {title}
                </span>
              )}
            </div>
            {loading?
            <span className="text-sm">loading</span>
            :count > 0  && (
              <div className="  view font-inter  flex px-2    text-[0.725rem]  ">
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

// <NavLink
//   to={path}
//   role="link"
//   className="w-full flex justify-center mb-2"
// >
//   {({ isActive }) => (
//     <div
//       onMouseEnter={hoverToggle}
//       onMouseLeave={hoverToggle}
//       className={`btn btn-sm   flex items-start  font-normal border-0  rounded-lg text-[0.8rem] text-center   ${
//         isActive
//           ? "  text-white bg-[#292a30] hover:bg-[#292a30]  text-white bg-[#292a30] hover:bg-[#292a30] "
//           : "text-gray-400/70 bg-transparent  "
//       } ${
//         sidebarState
//           ? " h-[2.7rem] w-[2.6rem] justify-center"
//           : " px-4 py-[1.5rem] justify-between "
//       } flex-shrink-0   whitespace-nowrap  relative capitalize   w-full`}
//     >
//       <div className="flex items-center justify-between  w-full  h-full">
//         <div className={`w-full  h-full flex items-center  ${!sidebarState?'justify-start gap-2.5':'justify-start'}`}>
//           <span className="text-[1rem] ">{icon}</span>
//           <span className="pt-0.5 overflow-hidden text-start  w-full max-w-[75%]">{!sidebarState && title}</span>
//         </div>
//         <div className="overflow-hidden ">
//           {!sidebarState && count && (
//             <span className={` text-[#fbfdfd]/60 lowercase mr-2  bg-transparent border-0 rounded-full   py-1.5 text-[0.7rem] font-helveticaRegular `}>
//               {count} new
//             </span>
//           )}
//         </div>
//       </div>

//       <div
//         className={`${isActive ? "h-[80%]" : "h-0"} ${
//           sidebarState ? "-left-[0.6rem]" : "-left-[0.6rem]  "
//         } transition-all duration-75 w-[3px] rounded-r-xl absolute  top-1/2 -translate-y-1/2 bg-[#486de9]`}
//       ></div>
//     </div>
//   )}
// </NavLink>
