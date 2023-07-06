import React from "react";
import axios from "axios";
import { BiPlus ,BiNote} from "react-icons/bi";
import AddCollectionModal from "../components/AddCollectionModal";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import socket from "../socket";
import {
  deleteCurrentUserCollection,
  addCurrentUserCollection,
} from "../features/user/currentUserSlice";
const Collections = () => {
  const currentUser = useSelector((state) => state.currentUser.data);
  const [addCollectionModalState, setAddCollectionModalState] =
    React.useState(false);
  const queryClient = new QueryClient();
  const dispatch = useDispatch();

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
      console.log(error);
    }
  };
  console.log(currentUser);
  // once fetchData true set returned data to the state
  const { isLoading } = useQuery(["userData"], fetchData, {
    enabled: !!currentUser?._id,
    onSuccess: (data) => {
      setCollections(data);
    },
  });

  // Trigger the query only when currentUser._id becomes available
  React.useEffect(() => {
    if (currentUser?._id) {
      // queryClient.invalidateQueries("userData");
      console.log("user loaded");
    }
  }, [currentUser]);

  // socket event handler
  React.useEffect(() => {
    // deleteCollection
    socket.on("deleteNoteCollection", (data) => {
      console.log("event: deleteNoteCollection", data);

      //  update the currentUser (which used in the whole app)
      //  with the added collection
      dispatch(deleteCurrentUserCollection(data));

      //update state on this component
      setCollections((prevCollections) =>
        prevCollections?.filter((c) => c._id !== data._id)
      );
    });
    // addcollection
    socket.on("addNoteCollection", (data) => {
      console.log("event: addNoteCollection", data);
      setAddCollectionModalState(false);
      //  update the currentUser (which used in the whole app)
      //  with the added collection
      dispatch(addCurrentUserCollection(data));

      //update state on this component
      setCollections((prevCollections) => [...prevCollections, data]);
    });
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
    <div className="h-screen overflow-y-hidden w-full flex flex-col items-start justify-start relative">
      <div className=" h-full  p-6 w-full ">
        <div className=" w-[19rem] h-full rounded-lg  overflow-y-hidden  border-dark">
          <div className="flex items-center text-[#d8d8d9] justify-between px-4 py-3">
            <span className="text-[0.9rem] font-normal">Upcoming task</span>
            <button
              onClick={addCollectionToggle}
              className="text-[0.95rem]  w-fit  font-normal     h-fit  px-2 view py-2"
            >
              <BiPlus />
            </button>
          </div>
          <div className=" w-full  pb-16  px-4  py-2 overflow-y-auto h-full space-y-2">
            {/* <button
              onClick={addCollectionToggle}
              className="text-[0.95rem]  w-full  thin-box-divider font-normal grid place-content-center   h-fit  px-2 py-2 view "
            >
              <BiPlus /> 
            </button>  */}
            {isLoading ? (
              <span>loading data</span>
            ) : collections?.length === 0 ? (
              <p className=" text-[0.95rem]">No collections to show</p>
            ) : (
              collections?.map((item, id) => (
                <div
                  className="min-h-[6.75rem] bg-[#1c1d21] hover:thin-box-divider rounded-md  flex cursor-pointer py-3 view w-full "
                  key={id}
                >
                  <div className=" flex flex-col w-full text-normal item-start justify-between ">
                    <div className="flex flex-col px-4">
                      <span className=" text-[0.8rem] text-[#d8d8d8] font-normal capitalize mt-2">
                        {item.collectionTitle}
                      </span>
                      <span className="text-[0.8rem] mt-2 overflow-hidden truncate text-[#7c7d83] w-full">
                        {item.description}
                      </span>
                    </div>
                    <div className="mt-3 w-full pt-2  px-4">
                      <span className=" text-[0.9rem] flex items-center gap-1 ">
                        <BiNote />{item.savedNotes.length} 
                      </span>
                    </div>
                  </div>
                  {/* <button
                    onClick={() => deleteCollection(item._id)}
                    className="text-xs view w-fit h-fit p-2"
                  >
                    delete
                  </button> */}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {addCollectionModalState && <AddCollectionModal collections />}
    </div>
  );
};

export default Collections;
