import React from "react";

import { BiDotsVerticalRounded, BiNote } from "react-icons/bi";
import NoteCollectionDropDownPositionContext from "../context/NoteCollectionDropDownPositionContext";
const NoteCollection = ({ item, parentScrollPosition, deleteCollection }) => {
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

  return (
    <div
      ref={ref}
      className=" px-4 relative bg-[#ffffff] rounded-lg flex cursor-pointer py-3 view w-full "

      data-objectid={item._id}
    >
      <div className=" flex flex-col w-full text-normal item-start justify-between ">
        <div className="flex flex-col pr-4">
          <span className="  mt-2 font-medium capitalize  text-[0.8rem]">
            {item.collectionTitle}
          </span>
          <p  className=" mt-1  text-[#999999]/90 line-clamp-3 max-w-[9rem]  text-[0.8rem]">
            {item.description}
          </p>
            {/* <span className=" mt-2 overflow-hidden truncate text-[0.7rem] text-[#999999]/50 w-full">
            ID: {item._id}
          </span> */}
        </div>
        <div className="mt-4 w-full pt-2 text-[#999999]  text-[0.8rem]">
          <span className=" flex items-center gap-1.5 ">
            {item.savedNotes.length}
            <BiNote />
            {/* <span>files</span> */}
          </span>
        </div>
      </div>
      <button
        onClick={sample}
        className="text-[0.9rem]   view w-fit h-fit py-1"
      >
        <BiDotsVerticalRounded />
      </button>
    </div>
  );
};

export default NoteCollection;
