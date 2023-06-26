import React, { useEffect } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import AddCollectionModal from "../components/AddCollectionModal";
import { QueryClient, useQuery } from "@tanstack/react-query";

import { io } from "socket.io-client";

const Collections = () => {
  const socket = io("http://localhost:3001");
  const { currentUser } = React.useContext(AuthContext);
  const [addCollectionModalState, setAddCollectionModalState] =
  React.useState(false);
  const queryClient = new QueryClient();
  const [collections, setCollections] = React.useState([]);

  const headers = {
    userID: currentUser?._id,
    "Content-Type": "application/json",
  };
  // get data from api
  const fetchData = async () => {
   try {
     if (currentUser) {
      const { data } = await axios.get("http://localhost:3001/collections/", {
        headers,
      });
      return data.data;
    }
    return {};
   } catch (error) {
      console.log(error)
   }
  };


  const { isLoading } = useQuery(["userData"], fetchData, {
    enabled: !!currentUser?._id,
    // once fetchData true set returned data to the state
    onSuccess: (data) => {
      setCollections(data);
    },
  });

  React.useEffect(() => {
    // Trigger the query only when currentUser._id becomes available
    if (currentUser?._id) {
      queryClient.invalidateQueries("userData");
    }
  }, [currentUser?._id]);



  // socket event handler
  React.useEffect(() => {
    // deleteCollection
    socket.on("deleteNoteCollection", (data) => {
      console.log("event: deleteNoteCollection", data);
      setCollections((prevCollections) =>
        prevCollections.filter((c) => c._id !== data._id)
      );
    });
    

    // addcollection
    socket.on('addNoteCollection',(data)=>{
      console.log("event: addNoteCollection", data)
      setCollections((prevCollections)=>
      [...prevCollections, data]
      )
    })

    return () => {
      socket.disconnect();
    };
  }, []);


  // ui event handlers
  const deleteCollection = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/collections/${id}`);
      socket.emit("deleteNoteCollection", id);
    } catch (error) {
      console.log(error);
    }
  };


  // toggle the modal
  const addCollectionToggle = () => {
    setAddCollectionModalState(!addCollectionModalState);
  };

  return (
    <div className="h-full w-full flex flex-col items-start justify-start relative">
      <div className=" h-full overflow-y-scroll px-10 pt-10 w-full">
        <div className=" w-full view h-full space-y-3 p-4">
          <button
            onClick={addCollectionToggle}
            className="text-xs view w-fit h-fit p-2"
          >
            create collection
          </button>
          {isLoading ? (
            <span>loading data</span>
          ) : collections?.length === 0 ? (
            <span>no collections to show</span>
          ) : (
            collections?.map((item, id) => (
              <div className="h-24 flex cursor-pointer view w-60" key={id}>
                <div className="view flex flex-col w-full text-normal item-start justify-end">
                  <span>{item.collectionTitle}</span>
                  <span className="text-sm">{item.description}</span>
                  <span className="text-gray-400 text-sm">
                    {item.savedNotes.length} files
                  </span>
                </div>
                <button
                  onClick={() => deleteCollection(item._id)}
                  className="text-xs view w-fit h-fit p-2"
                >
                  delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      {addCollectionModalState && <AddCollectionModal collections/>}
    </div>
  );
};

export default Collections;
