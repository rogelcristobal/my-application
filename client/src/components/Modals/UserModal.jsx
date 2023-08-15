import { useUser } from "@clerk/clerk-react";
import PropTypes from "prop-types";
const UserModal = ({ state, initials }) => {
  const{isLoaded,user}=useUser()
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={`bg-[#212121] rounded-lg drop-shadow absolute whitespace-nowrap overflow-hidden top-12 right-0 transition-all duration-100 ease-in-out ${
        state ? "h-96 w-72" : "h-0 w-0"
      }`}
    >
      <div className="h-28 b bg-neutral-700/10 relative">
        <div className="avatar placeholder cursor-pointer  absolute -bottom-[4.5rem]  -translate-y-2/4 left-1/2 -translate-x-1/2">
          <div className=" text-neutral-content text-[1rem] rounded-full w-[4.5rem] bg-[#181818] ">
            <span>{initials}</span>
          </div>
        </div>
      </div>

      <div className=" mt-12 w-full flex-col flex justify-center items-center">
        <span className="font-normal capitalize text-[1rem] text-center ">{isLoaded&&user.fullName}</span>
        <span className="font-normal mt-1 text-[#b7b7b7]/40 text-[0.775rem]">{isLoaded&&user.primaryEmailAddress.emailAddress}</span>
      </div>
    </div>
  );
};

UserModal.propTypes = {
  state: PropTypes.bool,
  initials: PropTypes.string,
};

export default UserModal;
