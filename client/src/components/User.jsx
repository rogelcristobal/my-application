import {  useUser } from "@clerk/clerk-react";
import React from "react";
import UserModal from "./Modals/UserModal";
import {PiCaretDown} from 'react-icons/pi'
const User = () => {
  const { isLoaded, user } = useUser();
  const [initials, setInitials] = React.useState(null);
  const [state, setState] = React.useState(false);
  const ref = React.useRef(null);

  const getInitials = (fullname) => {
    let initialStore = "";
    const name = fullname.split(" ");

    for (let letters of name) {
      if (letters) {
        initialStore += letters.charAt(0).toUpperCase();
      }
    }
    setInitials(initialStore);
  };

  const handleAvatarClick = () => {
    setState(!state);
  };
  React.useEffect(() => {
    if (isLoaded) {
      getInitials(user.fullName);
    }
  }, []);

 const handleMouseDown = (e) => {
  if (ref.current && !ref.current.contains(e.target)) {
    setState(false)
  }
};

React.useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown);

  return () => {
    document.removeEventListener('mousedown', handleMouseDown);
    
  };
}, [ref]);
  
  return (
    <div ref={ref} role="button"  className={`relative flex   items-center justify-between gap-2 `} onClick={handleAvatarClick}>
      <div className="avatar placeholder cursor-pointer ">
        <div className=" text-neutral-content text-[0.7rem] rounded-full w-[2.25rem] bg-[#20232c] ">
          <span>{initials}</span>
        </div>
      </div>
      <PiCaretDown className="text-[0.8rem] text-[#999999]/70 "/>

      <UserModal state={state} initials={initials} />
    </div>
  );
};

export default User;
