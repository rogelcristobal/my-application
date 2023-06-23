import axios from "axios";
import { m } from "framer-motion";
import React from "react";
import AuthContext from "../context/AuthContext";

const AddCollectionModal = () => {
  const [input, setInput] = React.useState({
    title: "",
    description: "",
  });
  const { currentUser } = React.useContext(AuthContext);

  const headers = {
    userID: currentUser._id,
    "Content-Type": "application/json",
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3001/collections/`,
        { title: input.title, description: input.description },
      headers 
      );
      console.log(response.data);
    } catch (error) {}

    setInput({
      title: "",
      description: "",
    });
  };
  return (
    <div className="fixed left-1/2 -translate-x-1/2 z-50 p-3 bg-white top-1/2 -translate-y-1/2 h-fit w-80 view text-sm">
      <span className="view"> create new collection</span>
      <form
        onSubmit={handleSubmit}
        className="view p-2 mt-2 flex flex-col w-full gap-6"
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
            className="bg-transparent view mt-2"
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
            className="bg-transparent view mt-2"
          />
        </div>
        <button
          type="submit"
          className="w-fit btn btn-sm view bg-inherit normal-case font-normal"
        >
          create
        </button>
      </form>
    </div>
  );
};

export default AddCollectionModal;
