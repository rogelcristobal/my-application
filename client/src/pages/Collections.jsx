import React from "react";
import SearchBar from "../components/SearchBar";
import AuthContext from "../context/AuthContext";
import axios from "axios";
const Collections = () => {
  const { data, loading } = React.useContext(AuthContext);
  // if(!userLoading){
  //   console.log()
  // }


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
    <div className="h-full   w-full flex flex-col items-start justify-start">
      <div className="w-full flex-shrink-0  pt-8 flex items-center justify-between px-10 gap-10 py-3 ">
        <SearchBar />
        <div
          className={`border-dark grid cursor-pointer  rounded-full h-10 w-10 place-content-center 
            `}
        >
          <span className="uppercase text-[0.9rem]">{data?.firstName.split("")[0]}</span>
        </div>
      </div>
      <div className="h-fit  w-full flex pt-4 px-10 pb-0 flex-col">


        {/* can be nested route? */}
        <span className="mb-4 font-semediummibold text-[0.8rem]  text-[#a7a9ad]/70">Collections</span>
        <span className="font-plus text-[1.325rem] font-medium  capitalize">
          <span className="text-semibold  "> </span>
        </span>
        {/* <span className="text-[0.8rem] font-plus text-black mt-3 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, eos?
        </span> */}
      </div>
      <div className="px-10 w-full h-full flex items-start container gap-4">
        {/* {!isLoading&& data?.data.map((item,id)=>(
          <span>{item.collectionTitle}</span>
        ))} */}
        <div className=" rounded-lg flex-shrink-0 flex flex-col items-start w-[20rem] h-full">
          <button onClick={createCollection} className="w-full text-[#a7a9ad]/70 btn btn-ghost capitalize text-[0.8rem] border-dark font-normal mb-4">create collection</button>
          {data?.noteCollection.length == 0?
            <span className="text-[#a7a9ad]/70 w-full text-center mt-8">no note collections</span>:
            data?.noteCollection.map((item,id)=>(
            <div  className="border-dark flex items-start justify-between min-h-[8rem] rounded-lg p-3 cursor-pointer w-full" key={id}>
              <span className="capitalize text-[0.9rem]">{item.collectionTitle}</span>
              <div onClick={()=>deleteCollection(item._id)} className="capitalize text-[0.8rem] text-[#a7a9ad]/70">delete</div>
            </div>
          ))
          }
        </div>
        <div className="rounded-lg w-full h-full"></div>

        
      </div>
    </div>
  );
};

export default Collections;
