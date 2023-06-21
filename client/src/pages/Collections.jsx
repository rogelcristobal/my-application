import React from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import { RiFolder2Line, RiMore2Fill } from "react-icons/ri";
import AddCollectionModal from "../components/AddCollectionModal";
const Collections = () => {
  const { currentUser, userDataLoading } = React.useContext(AuthContext);
  const [addCollectionModalState ,setAddCollectionModalState] = React.useState(false)
  const createCollection = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/collections/${data._id}`,
        {
          title: "admin notes",
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCollection = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/collections/${id}`
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addCollectionToggle=()=>{
    setAddCollectionModalState(!addCollectionModalState)
  }

  return (
    <div className="h-full w-full flex flex-col items-start justify-start relative">
      <div className=" h-full overflow-y-scroll px-10 w-full">
        <div className="h-fit  w-full flex   pb-4 items-start flex-col justify-start">
          {/* <div className="text-[#696e79]/70 w-full  py-3   pt-6  px-10  flex items-center justify-start ">
            <SearchBar />
          </div> */}
          <div className="view flex flex-col pt-10 w-fit max-w-lg ">
            {/* text-[#347ae2] */}
            <span className="view  text-[1.3rem] font-medium  capitalize">
              Collections
            </span>
            {/* <span className="mt-2.5 font-medium view text-[0.875rem] text-[#696e79]">
              View your created notes here.
            </span> */}
          </div>
        </div>

        <div className=" w-full view h-auto">
          <div className="w-full h-full">
           <div className="flex items-center justify-between">
             <span className=" font-medium view text-[0.8rem] text-[#696e79]">
              All files
            </span>
            <button onClick={addCollectionToggle} className="btn bg-inherit hover:bg-inherit btn-sm view hover:view normal-case font-normal h-10">Add collection</button>

           </div>
            <div className=" h-fit w-fit view p-2 grid grid-flow-col grid-cols-4 gap-3 mt-2">
              {userDataLoading ? (
                <p>loading collections</p>
              ) : currentUser.noteCollection.length == 0 ? (
                 <button onClick={addCollectionToggle} className="btn bg-inherit hover:bg-inherit btn-sm view hover:view normal-case font-normal h-10">Add collection</button>
              ) : (
                currentUser.noteCollection.map((item, id) => (
                  <div className="view h-32  w-56 rounded-lg cursor-pointer flex flex-col item-start justify-end p-3 bg-[#ffffff]" key={id}>
                    <span className="font-normal text-sm">{item.collectionTitle}</span>
                    <span></span>
                  </div>
                ))
              )}
             
            </div>
          </div>
        </div>
      </div>
       {addCollectionModalState&&
          <AddCollectionModal />
       }
      
    </div>
  );
};

export default Collections;
