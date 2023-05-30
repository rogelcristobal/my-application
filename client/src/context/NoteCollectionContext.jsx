import React from "react";
import Axios from 'axios'
const NoteCollectionContext = React.createContext();
import { useQuery } from "@tanstack/react-query";
export const NoteCollectionProvider = ({ USER_ID,children }) => {

   const fetchNotes = async (value) => {
    try {
      const response = await Axios.get(
        `http://localhost:3001/collections/${value}`
      );
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  };
  const { data, isLoading } = useQuery(["notes"], () =>
    fetchNotes(USER_ID)
  );
  return (
    <NoteCollectionContext.Provider value={{data,isLoading}}>
      {children}
    </NoteCollectionContext.Provider>
  );
};

export default NoteCollectionContext;
