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
      <div className=" h-full overflow-y-scroll w-full">
        <div className="h-fit  w-full flex pt-9  pb-3 items-start flex-col justify-start">
          <div className="text-[#696e79]/70 py-2 pt-0 mb-6 px-8  flex items-center justify-start  w-full  ">
          <SearchBar />
        </div>
         
        </div>

        <div className="px-8 w-full  h-[120%] pt-4">
          {/* text-[#a7a9ad]/80 */}
          <span className=" font-medium text-[0.85rem]"></span>
        
          {/* recent */}
          <div className="mt-4">
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
