import React from "react";
const NoteCollectionContext = React.createContext();

export const NoteCollectionProvider = ({ children }) => {
  const [fetchedData,setData] = React.useState([])
  return (
    <NoteCollectionContext.Provider value={{setData,fetchedData}}>
      {children}
    </NoteCollectionContext.Provider>
  );
};

export default NoteCollectionContext;
