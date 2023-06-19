import React from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import { RiFolder3Fill,RiMore2Fill } from "react-icons/ri";
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
        <div className="h-auto  w-full flex   pb-4 items-start flex-col justify-start">
          {/* <div className="text-[#696e79]/70 w-full  py-3   pt-6  px-10  flex items-center justify-start ">
            <SearchBar />
          </div> */}
          <div className="view flex flex-col pt-10 w-fit max-w-lg ">
            {/* text-[#347ae2] */}
            {/* <span className="mb-2 font-medium view text-[0.8rem] ">Dashboard</span> */}
            <span className="view  text-[1.3rem] font-medium  capitalize">
               collections
            </span>
          </div>
        </div>
        <div className="mt-2   view">
          <span className=" font-medium view text-[0.785rem] text-[#696e79]/60">
            <span className="font-medium text-[#696e79]">
              All Collections
            </span>
          </span>

          <div className="view h-fit w-fit grid grid-flow-rows grid-cols-3 gap-4 mt-4">
            {Array.from({ length: 4 }).map((item, id) => (
              <div key={id} className="bg-[#26262e] items-start cursor-pointer flex  justify-start flex-col p-4 h-28 w-[15rem]  rounded-lg">
                <div className=" view w-full flex justify-between items-center text-[1.1rem] text-[#86868a] ">
                  <RiFolder3Fill />
                  <RiMore2Fill className="text-[#76767c]/40 hover:text-[#76767c]"/>
                </div>
                <div className="flex flex-col items-start view h-full justify-end mt-5 w-full">
                  <span className="  text-inherit view w-full flex justify-start gap-1 items-end text-[0.875rem] ">
                    Lorem, ipsum.
                  </span>
                  <div className=" flex  flex-col mt-0.5  w-full">
                    <span className="text-[0.75rem] text-[#76767c] font-medium  flex items-center gap-2  ">
                      0 files.
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 view">
           <span className=" font-medium view text-[0.785rem] text-[#696e79]/60">
            <span className="font-medium text-[#696e79]">
              All Files
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Collections;
