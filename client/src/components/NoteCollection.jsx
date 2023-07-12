import React from "react";

import { BiDotsVerticalRounded, BiNote } from "react-icons/bi";
import NoteCollectionDropDownPositionContext from "../context/NoteCollectionDropDownPositionContext";
const NoteCollection = ({item,parentScrollPosition,deleteCollection}) => {
    const {setDropDownState,dropDownState} = React.useContext(NoteCollectionDropDownPositionContext)
  const ref = React.useRef(null)

    // pass this data to the context
  const sample=()=>{
   setDropDownState({
    isEnabled:true,
    el:ref.current.getBoundingClientRect()
   })
  }

  return (
    <div
      ref={ref}
      className=" px-4 relative  border-dark flex cursor-pointer py-3 view w-full "
      
    >
      <div className="  flex flex-col w-full text-normal item-start justify-between ">
        <div className="flex flex-col pr-4">
          <span className="   font-medium capitalize mt-2">
            {item.collectionTitle}
          </span>
          <span className=" mt-2 overflow-hidden truncate w-full">
            {item.description}
          </span>
        </div>
        <div className="mt-0 w-full pt-2 ">
          <span className=" flex items-center gap-2 ">
            {item.savedNotes.length}
            
            <span>files</span>
            {/* {parentScrollPosition} */}
          </span>
        </div>
      </div>
      <button
        // onClick={() => deleteCollection(item._id)}
        onClick={sample}
        className="text-[0.9rem] border-dark   view w-fit h-fit p-2"
      >
        <BiDotsVerticalRounded />
      </button>
    </div>
  );
};

export default NoteCollection;
