import React from "react";
import { NavLink } from "react-router-dom";
const SidebarLink = ({ title, sidebarState, icon, count, path }) => {
  const [hoverState, setHOverState] = React.useState(false);
  const hoverToggle = () => {
    setHOverState(!hoverState);
  };

  return (
    <NavLink
      to={path}
      role="link"
      className="w-full   mb-1.5 "
    >
      {({ isActive }) => (
        <div
          onMouseEnter={hoverToggle}
          onMouseLeave={hoverToggle}
          className={`w-full  rounded-lg relative  border-dark box-border h-[2.90rem] btn-sm btn border-0 ${isActive?'text-white bg-[#292a30]/60 hover:bg-[#292a30]/60':'text-gray-400/70  bg-transparent hover:bg-[#15191e]/50'}
          ${sidebarState?'flex justify-center    ':'flex justify-center px-3.5'}
          `}
        >
          <div className=" h-fit flex justify-between items-center overflow-hidden w-full">
            <div className="flex justify-start items-center  pl-0.5 max-w-[100%] font-normal text-[0.795rem] w-full capitalize gap-2">
              <span className="text-[1rem]">{icon}</span>
              {!sidebarState&&
              <span className=" text-start w-full  overflow-hidden truncate"> {title}</span>}
            </div>
            {count&& !sidebarState&&
            <span className="normal-case font-normal whitespace-nowrap text-[#fbfdfd]/50  text-[0.65rem]">23 new</span>
            }
          </div>

          {/* <div
            className={`${isActive ? "h-[230%]" : "h-0"} ${
              sidebarState ? "-left-[0.6rem]" : "-left-[1.5rem]  "
            } transition-all duration-75 w-[3px] rounded-r-xl absolute  top-1/2 -translate-y-1/2 bg-[#486de9]`}
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
