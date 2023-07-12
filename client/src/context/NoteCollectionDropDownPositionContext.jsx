import React, { createContext } from "react";
const NoteCollectionDropDownPositionContext = createContext()

export const NoteCollectionDropDownPositionProvider=({children})=>{
    const [dropDownState,setDropDownState] = React.useState({
        isEnabled:false,
        el:null
    })
    return(
        <NoteCollectionDropDownPositionContext.Provider value={{dropDownState,setDropDownState}}>{children}</NoteCollectionDropDownPositionContext.Provider>
    )
}
export default NoteCollectionDropDownPositionContext