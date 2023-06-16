import React from "react";
import { NavLink } from "react-router-dom";
const SidebarLink = ({ title, sidebarState, icon, count, path }) => {
  const [hoverState, setHOverState] = React.useState(false);
  const hoverToggle = () => {
    setHOverState(!hoverState);
  };

  return (
    <NavLink to={path} role="link" className="w-full   mb-1">
      {({ isActive }) => (
        <div
          onMouseEnter={hoverToggle}
          onMouseLeave={hoverToggle}
          className={`w-full  rounded-lg relative  border-0 box-border  btn-sm btn  ${
            isActive
              ? "text-inherit   bg-slate-100/50 hover:bg-slate-100/80"
              : "text-[#696e79]/70  bg-transparent hover:bg-transparent"
          }
          ${
            sidebarState
              ? "flex justify-center    h-[2.5rem]"
              : "flex justify-center px-3.5 h-[2.75rem]"
          }
          `}
        >
          <div className=" h-full flex justify-between items-center overflow-hidden w-full">
            <div
              className={`flex justify-start items-center   h-full font-medium  text-[0.8rem] w-full capitalize gap-3 ${!sidebarState?'max-w-[75%] ':'max-w-[100%]'}`}
            >
              {/* text-[#347ae2] */}
              <span className={`text-[0.9rem] mx-auto ${isActive&&' text-[#347ae2]'}`}>{icon}</span>
              {!sidebarState && (
                <span className="flex items-center tracking-wide text-start w-full h-full overflow-x-hidden  truncate">
                  
                  {title}
                </span>
              )}
            </div>
            {count > 0 && !sidebarState && (
              <div className=" absolute text-[#a7a9ad] badge  flex px-2 font-normal  right-1.5 border-0 normal-case text-[0.7rem] top-1/2 -translate-y-1/2 badge-sm bg-[#26272e]/60">
                {count}
              </div>
            )}
          </div>

          {/* <div
            className={`${isActive ? "h-[100%]" : "h-0"} ${
              sidebarState ? "-left-[0.75rem]" : "-left-[1rem]  "
            } transition-all duration-75 w-[3px] rounded-r-xl absolute  top-1/2 -translate-y-1/2 bg-[#4c74fc]`}
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
