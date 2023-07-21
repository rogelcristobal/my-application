import React from "react";
import { NavLink } from "react-router-dom";
const SidebarLink = ({ title, sidebarState, loading, icon,count, path,item }) => {
  const [hoverState, setHOverState] = React.useState(false);
  const hoverToggle = () => {
    setHOverState(!hoverState);
  };
  // console.log(item)
  return (
   <>
    <NavLink to={path} role="link" className="w-full mb-0.5  h-fit">
      {({ isActive }) => (
        <div
          onMouseEnter={hoverToggle}
          onMouseLeave={hoverToggle}
          className={`w-full  rounded-md h-[2.4rem] flex flex-col  relative px-4  border-0 box-border  ${
            isActive
              ? "text-inherit  bg-[#363636] hover:bg-[#363636] font-normal"
              : "text-inherit  bg-transparent hover:bg-transparent font-normal"
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
                className={`text-[0.9rem]   ${
                  isActive ? "":"text-[#b4b8b8]/70"
                }`}
              >
                {icon}
              </span>
              {!sidebarState && (
                <span className="flex items-center mt-0.5 text-start w-full h-fit overflow-x-hidden text-[0.85rem]  truncate ">
                  {title}
                </span>
              )}
            </div>
            {loading?
            <span className="text-sm">loading</span>
            :count > 0  && (
              <div className=" text-[0.6rem]  rounded-full h-[1.25rem] flex items-center justify-center w-5 text-inherit  font-medium">
                <span>{count}</span>
              </div>
            )
            
            }
          </div>

          {/* <div
            className={`${isActive ? "h-[100%]" : "h-0"} ${
              sidebarState ? "left-[0rem]" : "-left-[1rem]  "
            } transition-all duration-75 w-[0.275rem] bg-blue-500 rounded-r-xl absolute  top-1/2 -translate-y-1/2 `}
          ></div> */}
      {/* {item && 
      <div className="">asd</div>
      } */}
      
        </div>
      )}


    </NavLink>

      {/* {item&&
      <div className="h-fit  w-full flex flex-col px-0">
        {item.map((item,id)=>(
          <SidebarLink title={item.collectionTitle} path={`/${item.collectionTitle}`} key={id}/>
        ))
}
      </div>
      } */}

   </>
  );
};

export default SidebarLink;
