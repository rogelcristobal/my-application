import React from "react";
import axios from "axios";
import {  useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCurrentUserCollection,
  addCurrentUserCollection,
  updateDataFromInitialFetch,
} from "../features/user/currentUserSlice";
import SocketContext from "../context/SocketContext";



const Collections = () => {
  const { socket } = React.useContext(SocketContext);
  const currentUser = useSelector((state) => state.currentUser.data);
  const [addCollectionModalState, setAddCollectionModalState] =
  React.useState(false);
  const dispatch = useDispatch();
  // const [activeTab, setActiveTab] = React.useState(0);
  // const currentUserLoading = useSelector((state) => state.currentUser.loading);
  // const parentScrollableRef = React.useRef(null);
  // const dropDownRef = React.useRef(null);
  // const scrollPosition = useScrollPosition(parentScrollableRef);
  // const { dropDownState, setDropDownState } = React.useContext(
  //   NoteCollectionDropDownPositionContext
  // );
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
  // const deleteCollection = async () => {
  //   setDropDownState({
  //     ...dropDownState,
  //     isEnabled: false,
  //   });
  //   try {
  //     await axios.delete(
  //       `http://localhost:3001/collections/${dropDownState.el.dataset.objectid}`
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // toggle the modal
  // const addCollectionToggle = () => {
  //   setAddCollectionModalState(!addCollectionModalState);
  // };

  // const handleClickOutside = (e) => {
  //   if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
  //     setDropDownState({
  //       ...dropDownState,
  //       isEnabled: false,
  //     });
  //   }
  // };

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

  // React.useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);



  return (
   <div className="h-full overflow-y-auto font-inter w-full flex flex-col items-end justify-start relative">
      <div className=" h-[150%]  pt-[3.5rem]   w-full">
        <div className="    ">
          <div className="flex items-center px-12  ">
            <div className="flex flex-col  container mx-auto">
              <span className="text-[0.8rem]  text-inherit  font-semibold">
                {/* <span className="capitalize ">Dashboard</span> */}
                <p className="text-[1.55rem] text-[#eeeeee] mb-5 mt-1.5 font-medium capitalize">
                  {" "}
                Notes
                </p>
              </span>
            </div>

            
          </div>
          <div className="px-6 pt-2 h-52 mt-8 container mx-auto ">
           

          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
