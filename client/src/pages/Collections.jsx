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
import {BiTrashAlt,BiEdit} from 'react-icons/bi'



const Collections = () => {
  const { socket } = React.useContext(SocketContext);
  const currentUser = useSelector((state) => state.currentUser.data);
  const [addCollectionModalState, setAddCollectionModalState] =
    React.useState(false);
  const dispatch = useDispatch();
  const [collections, setCollections] = React.useState([]);
  const parentScrollableRef = React.useRef(null);
  const dropDownRef = React.useRef(null);
  const scrollPosition = useScrollPosition(parentScrollableRef);
  const { dropDownState, setDropDownState } = React.useContext(
    NoteCollectionDropDownPositionContext
  );
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

  // once fetchData true set returned data to the state
  const { isLoading } = useQuery(["userData"], fetchData, {
    enabled: !!currentUser?._id,
    onSuccess: (data) => {
      setCollections(data);
    },
  });

  // ui event handlers
  const deleteCollection = async () => {
    setDropDownState({
      ...dropDownState,
      isEnabled: false,
    });
    try {
      await axios.delete(
        `http://localhost:3001/collections/${dropDownState.el.dataset.objectid}`
      );
    } catch (error) {
      console.log(error);
    }
  };
  // toggle the modal
  const addCollectionToggle = () => {
    setAddCollectionModalState(!addCollectionModalState);
  };

  const handleClickOutside = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setDropDownState({
        ...dropDownState,
        isEnabled: false,
      });
    }
  };

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

  React.useEffect(() => {
    setDropDownState({ ...dropDownState, isEnabled: false });
  }, [scrollPosition]);
  // console.log(dropDownState.el)

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="h-screen overflow-y-hidden  w-full flex flex-col items-start justify-start relative">

      <div className="h-fit pb-6 pt-6 px-8 bg-white flex-col flex w-full items-start relative">
        <span className="text-[1.25rem]  font-semibold">  Collections</span>
        
      </div>
      <div className=" h-full border-dark-top  w-full relative">
        <div className="view w-[20rem] h-full border-dark-right bg-white overflow-y-hidden relative ">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={addCollectionToggle}
              className="text-[0.785rem]  w-fit hover:bg-transparent bg-transparent border-dark hover:border-dark font-medium rounded-md   text-inherit hover:text-inherit   h-[2.5rem]  px-4  btn btn-sm normal-case"
            >
              Add
            </button>
            {/* <p>scroll_pos: {Math.floor(scrollPosition)}</p> */}
          </div>
          {/* scrollabe parent */}
          <div
            ref={parentScrollableRef}
            className=" w-full  pb-52  px-3  py-0 overflow-y-auto   h-full space-y-2.5"
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
                top:
                  Math.floor(dropDownState.el.getBoundingClientRect().top) + 55,
                left:
                  Math.floor(dropDownState.el.getBoundingClientRect().right) -
                  50,
              }}
              className={`h-fit fixed z-[50]  w-fit bg-white `}
            >


              {/* dropdown */}
              <div
                ref={dropDownRef}
                onMouseLeave={() =>
                  setDropDownState({ ...dropDownState, isEnabled: false })
                }
                className="join join-vertical font-inter "
              >
                <button
                  onClick={deleteCollection}
                  className="btn hover:bg-[#f3f5f9]/50 hover:text-inherit flex items-center justify-start bg-white capitalize font-normal border-dark join-item text-[0.8rem]"
                >
                 <BiTrashAlt className="text-[0.9rem]"/> Delete
                </button>
                <button className="flex justify-start btn hover:bg-[#f3f5f9]/50 hover:text-inherit  bg-white capitalize font-normal border-dark join-item text-[0.8rem]">
                  <BiEdit className="text-[0.925rem]"/> Edit
                </button>
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
