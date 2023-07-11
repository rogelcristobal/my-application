import React from "react";
import axios from "axios";
import { BiDotsVerticalRounded ,BiNote} from "react-icons/bi";
import AddCollectionModal from "../components/AddCollectionModal";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCurrentUserCollection,
  addCurrentUserCollection,
} from "../features/user/currentUserSlice";
import SocketContext from "../context/SocketContext";
const Collections = () => {
  const {socket} = React.useContext(SocketContext)
  const currentUser = useSelector((state) => state.currentUser.data);
  const [addCollectionModalState, setAddCollectionModalState] =
    React.useState(false);
  const dispatch = useDispatch();

  const [collections, setCollections] = React.useState([]);
  const queryClient = new QueryClient()
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
  // console.log(currentUser);
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
      queryClient.invalidateQueries("userData");
    }
  }, [currentUser]);



  // socket event handler
  // deleteCollection
  React.useEffect(() => {
    // console.log("event: deleteNoteCollection", data);
    socket.on("deleteNoteCollection", (data) => {
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
      // console.log("event: addNoteCollection", data);
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
        <div className=" w-[19rem] h-full rounded-lg  overflow-y-hidden  ">
          <div className="flex items-center  justify-between px-4 py-2">
            {/* <span className="text-[0.9rem] ">All notes</span> */}
            {/* <button
              onClick={addCollectionToggle}
              className="text-[0.95rem]  w-fit  font-normal     h-fit  px-1.5 view py-2"
            >
              <BiPlus />
            </button> */}
          </div>
          <div className=" w-full  pb-12  px-2  py-2 overflow-y-auto  h-full space-y-2.5">
            <button
              onClick={addCollectionToggle}
              className="  w-fit   font-normal  flex border-dark  items-center justify-center  gap-2  h-fit  px-2 py-3 view  "
            >
              <span className="text-[0.9rem]  ">Add Collection</span>
            </button> 
            {isLoading ? (
              <span>loading data</span>
            ) : collections?.length === 0 ? (
              <p className=" ">No collections to show</p>
            ) : (
              collections?.map((item, id) => (
                <div
                  className=" px-4 relative  border-dark flex cursor-pointer py-3 view w-full "
                  key={id}
                >
                  <div className="  flex flex-col w-full text-normal item-start justify-between ">
                    <div className="flex flex-col pr-4">
                      <span className="   font-normal capitalize mt-2">
                        {item.collectionTitle}
                      </span>
                      <span className=" mt-2 overflow-hidden truncate w-full">
                        {item.description}
                      </span>
                    </div>
                    <div className="mt-0 w-full pt-2 ">
                      <span className=" flex items-center gap-2 ">
                        {item.savedNotes.length} 
                        <BiNote />
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteCollection(item._id)}
                    className="text-[0.9rem] border-dark   view w-fit h-fit p-2"
                  >
                    <BiDotsVerticalRounded />
                  </button>
                  
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
