import React from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import { RiFolder2Line, RiMore2Fill } from "react-icons/ri";
const Collections = () => {
  const { data, loading } = React.useContext(AuthContext);

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
  return (
    <div className="h-full  w-full flex flex-col items-start justify-start relative">
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

        <div className=" w-full  h-[120%]  pt-2">
          <div className=" view">
            <span className=" font-medium view text-[0.8rem] text-[#696e79]">
              Note collections
            </span>
           
          </div>
          {/* recent */}
          {/* <div className="mt-4 view">
            <span className=" font-medium text-[0.8rem] mb-4 text-[#696e79]  view  font-inter ">
              Recently added
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Collections;
