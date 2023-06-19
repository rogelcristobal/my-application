import React from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import SearchBar from "../components/SearchBar";
const Collections = () => {
  const { data, loading } = React.useContext(AuthContext);



  const createCollection=async()=>{
    try {
      const response = await axios.post(`http://localhost:3001/collections/${data._id}`,{
        title:"admin notes"
      })
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteCollection=async(id)=>{
   
    try {
      const response = await axios.delete(`http://localhost:3001/collections/${id}`)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
   <div className="h-full  w-full flex flex-col items-start justify-start relative">
      <div className=" h-full overflow-y-scroll px-12 w-full">
        <div className="h-fit  w-full flex   pb-4 items-start flex-col justify-start">
          {/* <div className="text-[#696e79]/70 w-full  py-3   pt-6  px-10  flex items-center justify-start ">
            <SearchBar />
          </div> */}
          <div className="view flex flex-col pt-10 w-fit max-w-lg ">
            {/* text-[#347ae2] */}
            {/* <span className="mb-2 font-medium view text-[0.8rem] ">Dashboard</span> */}
            <span className="view  text-[1.3rem] font-medium  capitalize">
            Collections
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
