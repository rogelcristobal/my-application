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
      className=" relative  view rounded-none flex cursor-pointer p-2  w-full "

      data-objectid={item._id}
    >
      <div className=" flex  w-full flex-col item-start justify-between ">
        <div className="flex  w-full flex-col">
          <span className="  mt-0 font-medium capitalize  text-[0.875rem]">
            {item.collectionTitle}
          </span>
          <p  className=" mt-0.5   line-clamp-2 max-w-[100%] text-[0.775rem] first-letter:uppercase">
            {item.description}
          </p>
            <span className=" mt-2 overflow-hidden truncate text-[0.7rem] text-[#7c8292]/50 w-full">
            ID: {item._id}
          </span>
        </div>
        <div className="mt-0.5 w-full  text-[#7c8292]  text-[0.7rem]">
          <span className=" flex items-center gap-1.5 ">
            {item.savedNotes.length}
            <span>files</span>
          </span>
        </div>
      </div>
      <button
        onClick={sample}
        className="text-[0.9rem] view  flex-shrink-0 w-fit h-fit py-1 px-2"
      >
        <BiDotsVerticalRounded />
      </button>
    </div>
  );
};

export default NoteCollection;
