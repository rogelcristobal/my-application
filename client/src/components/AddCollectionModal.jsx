import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
const AddCollectionModal = () => {
 
  const [input, setInput] = React.useState({
    title: "",
    description: "",
  });
  const currentUser = useSelector(state=>state.currentUser.data)
  const headers = {
    userID: currentUser?._id,
    "Content-Type": "application/json",
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       await axios.post(
        `http://localhost:3001/collections/`,
        { title: input.title, description: input.description },
      {headers} 
      );

      
    } catch (error) {}

    setInput({
      title: "",
      description: "",
    });
  };
  return (
    <div className="fixed left-1/2 -translate-x-1/2 z-50 p-3 bg-white top-1/2 -translate-y-1/2 h-fit w-80 view text-sm">
      <span className="view"> create collection</span>
      <form
        onSubmit={handleSubmit}
        className="view p-2 mt-0.5 flex flex-col w-full gap-2"
      >
        <div className="w-full flex flex-col">
          <label htmlFor=""> title</label>
          <input
            value={input.title}
            onChange={(e) =>
              setInput({
                ...input,
                title: e.target.value,
              })
            }
            type="text"
            name=""
            id=""
            className="bg-transparent view mt-0.5"
          />
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor=""> details</label>
          <input
            value={input.description}
            onChange={(e) =>
              setInput({
                ...input,
                description: e.target.value,
              })
            }
            type="text"
            name=""
            id=""
            className="bg-transparent view mt-0.5"
          />
        </div>
        <button
          type="submit"
          className="w-fit btn btn-sm view bg-inherit normal-case font-normal text-inherit rounded-none h-fit hover:bg-transparent"
        >
          create
        </button>
      </form>
    </div>
  );
};

export default AddCollectionModal;
