import React from "react";
import axios from "axios";
import AddCollectionModal from "../components/AddCollectionModal";
import SearchBar from "../components/SearchBar";
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
import { GoSidebarExpand } from "react-icons/go";
const Collections = () => {
  const { socket } = React.useContext(SocketContext);
  const currentUser = useSelector((state) => state.currentUser.data);
  const [activeTab, setActiveTab] = React.useState(0);
  const currentUserLoading = useSelector((state) => state.currentUser.loading);
  const [addCollectionModalState, setAddCollectionModalState] =
    React.useState(false);
  const dispatch = useDispatch();
  const parentScrollableRef = React.useRef(null);
  const dropDownRef = React.useRef(null);
  // const scrollPosition = useScrollPosition(parentScrollableRef);
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

  // React.useEffect(() => {
  //   setDropDownState({ ...dropDownState, isEnabled: false });
  // }, [scrollPosition]);

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: '1',
    label: `Notes`,
    children: `Content of Tab Pane 1`,
  },
  {
    key: '2',
    label: `Todos`,
    children: `Content of Tab Pane 2`,
  },

];

  return (
    <div className="text-sm text-neutral-100/40 h-screen flex relative w-full overflow-y-scroll pt-[4rem]">
      <div className="h-[200vh] opacity-70 text-xs absolute w-16 view left-4">
        
      </div>
      <div className="xl:mx-auto xl:container xl:px-0 lg:px-8 w-full  view h-fit flex items-start flex-col justify-center">
        <div className="view w-fit h-fit flex flex-col pt-8">
          <span className="text-white font-medium md:text-[1.45rem] xl:text-[1.5rem]">
            Projects
          </span>
          <span className="text-[0.8rem] xl:mt-3 text-[#676269]  font-medium">
            Access your saved notes and todos here.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Collections;
