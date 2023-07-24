import React from "react";
import axios from "axios";
import AddCollectionModal from "../components/AddCollectionModal";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCurrentUserCollection,
  addCurrentUserCollection,
  updateDataFromInitialFetch,
} from "../features/user/currentUserSlice";
import SocketContext from "../context/SocketContext";
import NoteCollection from "../components/NoteCollection";
import { useScrollPosition } from "../hook/useScrollPosition";
import NoteCollectionDropDownPositionContext from "../context/NoteCollectionDropDownPositionContext";
import { LuTrash2, LuEdit } from "react-icons/lu";
import { Routes, Route, useParams } from "react-router-dom";
import Sample from "../components/Sample";
const Collections = () => {
  const { socket } = React.useContext(SocketContext);
  const currentUser = useSelector((state) => state.currentUser.data);
  const currentUserLoading = useSelector((state) => state.currentUser.loading);
  const [addCollectionModalState, setAddCollectionModalState] =
    React.useState(false);
  const dispatch = useDispatch();
  const parentScrollableRef = React.useRef(null);
  const dropDownRef = React.useRef(null);
  const scrollPosition = useScrollPosition(parentScrollableRef);
  const { dropDownState, setDropDownState } = React.useContext(
    NoteCollectionDropDownPositionContext
  );
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
      //then updates the redux state
      dispatch(updateDataFromInitialFetch(data));
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

  // socket event handler
  // deleteCollection
  React.useEffect(() => {
    // console.log("event: deleteNoteCollection", data);
    socket.on("deleteNoteCollection", (data) => {
      //  update the currentUser (which used in the whole app)
      //  with the added collection
      dispatch(deleteCurrentUserCollection(data));

      //update state on this component
    });
    // addcollection
    socket.on("addNoteCollection", (data) => {
      // console.log("event: addNoteCollection", data);
      setAddCollectionModalState(false);
      //  update the currentUser (which used in the whole app)
      //  with the added collection
      dispatch(addCurrentUserCollection(data));

      //update state on this component
      // console.log(data)
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  React.useEffect(() => {
    setDropDownState({ ...dropDownState, isEnabled: false });
  }, [scrollPosition]);

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="h-screen overflow-y-hidden  w-full flex flex-col items-start justify-start relative">
      <div className="h-fit py-2 px-10  gap-4 flex w-full items-start relative">
        <span className="text-[1.375rem] font-medium text-white"> Collections</span>
        <span>
          {currentUserLoading ? (
            <span>loading</span>
          ) : (
            <span className="hidden">{currentUser?.noteCollections.length}</span>
          )}
        </span>
      </div>
      <div className=" h-full px-8 w-full flex items-start justify-start hidden relative">
        <div className=" w-[19rem] h-full  overflow-y-hidden relative ">
          {/* <div className="flex items-center justify-start p-2">
            <button
              onClick={addCollectionToggle}
              className=" w-fit   hover:bg-transparent bg-transparent border-dark font-normal rounded-none  text-inherit   tracking-tight text-[0.8rem] h-fit   hover:border-dark  btn btn-sm normal-case"
            >
              New collection
            </button>
          </div> */}

          <div
            ref={parentScrollableRef}
            className=" w-full  pb-52  px-2  py-1 overflow-y-auto   h-full space-y-1"
          >
            {isLoading ? (
              <span>loading data</span>
            ) : currentUser?.noteCollections?.length === 0 ? (
              <p className=" ">No collections to show</p>
            ) : (
              currentUser?.noteCollections?.map((item, id) => (
                <NoteCollection
                  item={item}
                  key={id}
                  id={id}
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
                  Math.floor(dropDownState.el.getBoundingClientRect().top) + 34,
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
                className="join join-horizontal font-inter hover:drop-shadow-md"
              >
                <button
                  onClick={deleteCollection}
                  className="btn bg-[#ffffff] text-inherit hover:bg-inherit flex items-center justify-start  capitalize font-medium border-dark hover:border-dark btn-sm h-[2.4rem] px-3 join-item text-[0.8rem]"
                >
                  <LuTrash2 className="text-[0.925rem]" />
                </button>
                <button className="btn bg-[#ffffff] text-inherit hover:bg-inherit flex items-center justify-start  capitalize font-medium border-dark hover:border-dark btn-sm h-[2.4rem] px-3 join-item text-[0.8rem]">
                  <LuEdit className="text-[0.925rem]" />
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="w-96 h-full ">
          <Routes>
            <Route path="/:collectionID" element={<Sample></Sample>}></Route>
          </Routes>
        </div>
      </div>
      {addCollectionModalState && <AddCollectionModal collections />}
    </div>
  );
};

export default Collections;
