import React from "react";
import { PiDotsThreeOutlineVerticalBold, PiNoteBlankBold } from "react-icons/pi";
import NoteCollectionDropDownPositionContext from "../context/NoteCollectionDropDownPositionContext";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";



const NoteCollection = ({ item, id }) => {
  const { setDropDownState, dropDownState } = React.useContext(
    NoteCollectionDropDownPositionContext
  );
  const ref = React.useRef(null);

  // pass this data to the context
  const sample = () => {
    setDropDownState({
      isEnabled: true,
      el: ref.current,
    });
  };
  const navigate = useNavigate();
  const nav = () => {
    navigate(`/collections/${item._id}`);
  };
  // React.useEffect(()=>{
  //   if(id===0){
  //     navigate(`/collections/${item._id}`)
  //   }
  // },[id])
  return (
    // relative  view rounded-none flex cursor-pointer p-2  w-full
    <NavLink ref={ref} to={`/collections/${id}`} data-objectid={item._id} className="w-[16rem]">
    {({ isActive }) => (
      // [#436bfe
        <div
          className={`relative   flex cursor-pointer  p-[0.75rem] w-full ${isActive&&'outline outline-[2.25px] outline-inherit'}`}
        >
          <div className={` flex  w-full flex-col item-start justify-between  `}>
            <div className="flex  w-full flex-col">
              <span className="  mt-0 font-medium capitalize  text-[0.85rem]">
                {item.collectionTitle}
              </span>
              {/* <p className=" mt-1   line-clamp-2 max-w-[100%] text-[0.8rem] text-[#667085]/90 ">
                {item.description}
              </p> */}
              {/* <span className=" mt-2 overflow-hidden truncate text-[0.8rem] text-[#7c8292]/70 w-full">
                ID: {item._id}
              </span> */}
          
               
            </div>
            <div className="mt-2 w-full  text-[#667085]/60  text-[0.8rem]">
              <span className=" flex items-center  font-medium gap-1.5 text-[0.8rem]">
                <span>{item.savedNotes?.length}</span> files
                {/* <PiNoteBlankBold className="mb-0.5"/> */}
              </span>
            </div>
          </div>
          <button
            onClick={sample}
            className="text-[0.9rem] text-[#667085]/70  flex-shrink-0 w-fit h-fit py-1 px-1"
          >
            <PiDotsThreeOutlineVerticalBold />
          </button>
        </div>
        )}
    </NavLink>
  );
};

export default NoteCollection;
