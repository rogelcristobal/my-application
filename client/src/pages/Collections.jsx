import React from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import AddCollectionModal from "../components/AddCollectionModal";
const Collections = () => {
  const { currentUser, userDataLoading } = React.useContext(AuthContext);
  const [addCollectionModalState, setAddCollectionModalState] =
    React.useState(false);
  

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

  const addCollectionToggle = () => {
    setAddCollectionModalState(!addCollectionModalState);
  };

  return (
    <div className="h-full w-full flex flex-col items-start justify-start relative">
      <div className=" h-full overflow-y-scroll px-10 w-full">
        <div className="h-fit w-full flex view  pb-0 items-start flex-col justify-start"></div>
        <div className=" w-full view h-full p-3">
          <button
            onClick={addCollectionToggle}
            className="text-xs view w-fit h-fit p-2"
          >
            create collection
          </button>
          {userDataLoading ? (
            <span>loading data</span>
          ) : currentUser.noteCollection.length == 0 ? (
            <span>no collections to show</span>
          ) : (
            currentUser.noteCollection.map((item, id) => (
              <div className="h-24 flex  view w-60" key={id}>
               <div className="view flex flex-col w-full item-start justify-end">
                 <span>{item.collectionTitle}</span>
                <span>{item.description}</span>
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
      {addCollectionModalState && <AddCollectionModal />}
    </div>
  );
};

export default Collections;
