import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const ButtonLink = ({ icon, title,path,handler }) => {
  const [hover, setHover] = React.useState(false);
  const handleMouseHover=()=>{
    setHover(!hover)
  }
  const handleFunction=()=>{
    handler()
  }
 if(path){
   return (
      <Link
      to={path}
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseHover}
      role="link"
      className={`w-full px-3  cursor-pointer rounded-md h-[2.5rem]  flex flex-col font-normal relative    
             ${
               hover
                 ? "text-[#e8e8e8] bg-transparent hover:bg-transparent view "
                 : "text-[#999999]/70  bg-transparent hover:bg-transparent   "
             }
          `}
    >
      <div className={`flex-shrink-0 h-full   flex justify-between items-center overflow-hidden w-full `}>
        <div
          className={`flex justify-start items-center   h-full    w-full capitalize gap-3 `}
        >
          {/* text-[#004feb] */}
          <span
            className={`text-[1rem]   ${
              hover ? "text-inherit" : "text-[#999999]/70"
            }`}
          >
            {icon}
          </span>

          <span className="flex  items-center mt-0.5 text-start w-full h-full overflow-x-hidden text-[0.865rem]  truncate ">
            {title}
          </span>
        </div>
      </div>
    </Link>    
    );
 }else{
   return (
      <div
      onClick={handleFunction}
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseHover}
      role="link"
      className={`w-full px-3  cursor-pointer rounded-md h-[2.5rem]  flex flex-col font-normal relative    
             ${
               hover
                 ? "text-[#e8e8e8] bg-transparent hover:bg-transparent view "
                 : "text-[#999999]/70  bg-transparent hover:bg-transparent   "
             }
          `}
    >
      <div className={`flex-shrink-0 h-full   flex justify-between items-center overflow-hidden w-full `}>
        <div
          className={`flex justify-start items-center   h-full    w-full capitalize gap-3 `}
        >
          {/* text-[#004feb] */}
          <span
            className={`text-[1rem]   ${
              hover ? "text-inherit" : "text-[#999999]/70"
            }`}
          >
            {icon}
          </span>

          <span className="flex  items-center mt-0.5 text-start w-full h-full overflow-x-hidden text-[0.865rem]  truncate ">
            {title} 
          </span>
        </div>
      </div>
    </div>    
    );
 }
 
};

ButtonLink.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  path: PropTypes.string,
  handler: PropTypes.func
};

export default ButtonLink;
