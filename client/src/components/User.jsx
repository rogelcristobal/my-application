import { useUser } from "@clerk/clerk-react";
import React from "react";
import UserModal from "./Modals/UserModal";
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
    <div ref={ref} className="relative" onClick={handleAvatarClick}>
      <div className="avatar placeholder cursor-pointer ">
        <div className=" text-neutral-content text-[0.785rem] rounded-full w-9 bg-[#212121] ">
          <span>{initials}</span>
        </div>
      </div>

      <UserModal state={state}/>
    </div>
  );
};

export default User;
