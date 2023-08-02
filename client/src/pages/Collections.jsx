import React from "react";
import axios from "axios";
import AddCollectionModal from "../components/AddCollectionModal";
import SearchBar from "../components/SearchBar";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { Tabs } from "antd";
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
import {GoSidebarExpand} from 'react-icons/go'
const Collections = () => {
  const { socket } = React.useContext(SocketContext);
  const currentUser = useSelector((state) => state.currentUser.data);
  const [activeTab,setActiveTab] = React.useState(0)
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

  return (
    <div className="text-sm text-neutral-100/40"> collections page</div>
  );
};

export default Collections;
