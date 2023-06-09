import React from "react";
import axios from "axios";
import AddCollectionModal from "../components/AddCollectionModal";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCurrentUserCollection,
  addCurrentUserCollection,
} from "../features/user/currentUserSlice";
import SocketContext from "../context/SocketContext";
import NoteCollection from "../components/NoteCollection";
import { useScrollPosition } from "../hook/useScrollPosition";
import NoteCollectionDropDownPositionContext from "../context/NoteCollectionDropDownPositionContext";

const Collections = () => {
  const { socket } = React.useContext(SocketContext);
  const currentUser = useSelector((state) => state.currentUser.data);
  const [addCollectionModalState, setAddCollectionModalState] =
    React.useState(false);
  const dispatch = useDispatch();

  const [collections, setCollections] = React.useState([]);
  const queryClient = new QueryClient();
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
  const x = "10rem";
  // toggle the modal
  const addCollectionToggle = () => {
    setAddCollectionModalState(!addCollectionModalState);
  };

  // ui
  const parentScrollableRef = React.useRef(null);

  const scrollPosition = useScrollPosition(parentScrollableRef);

  const { dropDownState, setDropDownState } = React.useContext(
    NoteCollectionDropDownPositionContext
  );

  React.useEffect(() => {
    setDropDownState({ ...dropDownState, isEnabled: false });
  }, [scrollPosition]);
  // console.log(dropDownState.el)
  return (
    <div className="h-screen overflow-y-hidden w-full flex flex-col items-start justify-start relative">
      <div className=" h-full  p-6 w-full relative">
        <div className=" w-[19rem] h-full rounded-lg  overflow-y-hidden relative ">
          <div className="flex items-center  justify-between px-2 py-2">
            <button
              onClick={addCollectionToggle}
              className="text-[0.95rem]  w-fit  font-normal  border-dark   h-fit  px-4 view py-2"
            >
              add
            </button>
            <p>scroll_pos: {Math.floor(scrollPosition)}</p>
          </div>
          {/* scrollabe parent */}
          <div
            ref={parentScrollableRef}
            className=" w-full  pb-12  px-2  py-2 overflow-y-auto   h-full space-y-2.5"
          >
            {isLoading ? (
              <span>loading data</span>
            ) : collections?.length === 0 ? (
              <p className=" ">No collections to show</p>
            ) : (
              collections?.map((item, id) => (
                // this is the element i want to track
                <NoteCollection
                  item={item}
                  key={id}
                  parentScrollPosition={scrollPosition}
                  deleteCollection={deleteCollection}
                />
              ))
            )}
          </div>

          {dropDownState.isEnabled && (
            <div
              style={{
                top: Math.floor(dropDownState.el.top) + 55,
                left: dropDownState.el.right - 50,
              }}
              className={`h-fit fixed z-[50]  w-fit bg-white `}
            >
              <div className="join join-vertical font-inter">
                <button onClick={()=>console.log(dropDownState.el)} className="btn hover:btn-accent bg-white capitalize font-normal border-dark join-item">Delete</button>
                <button className="btn hover:btn-accent bg-white capitalize font-normal border-dark join-item">Edit</button>
             
              </div>
            </div>
          )}
        </div>
      </div>
      {addCollectionModalState && <AddCollectionModal collections />}
    </div>
  );
};

export default Collections;
