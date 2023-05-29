import React from "react";
import Sidebar from "../components/Sidebar";
Sidebar;
import { Routes, Route } from "react-router-dom";
import Collections from "./Collections";
import Axios from 'axios'
import {useQuery} from '@tanstack/react-query'

const Home = () => {
  const fetchNotes =async(value)=>{
    try {
      const response = await Axios.get(`http://localhost:3001/notes/user/${value}`)
      return response.data
    } catch (error) {
      console.log(error.message)
    }
  }
  const {data,isLoading} = useQuery(["notes"], ()=>fetchNotes('64696464da5bb77ea10861ac'))
 
 
  
  return (
      <div className="h-screen w-full bg-[#171717] text-white flex items-start  justify-start relative">
        <Sidebar data={data} loading={isLoading}></Sidebar>
        <Routes>
          <Route
            index
            element={
              <div className="h-full  pt-10 w-full flex flex-col items-start justify-start">
                <div className="h-fit w-full flex  px-10 pb-6 flex-col">
                  {/* <span className="mb-3 font-medium text-[0.85rem] text-[#6360ea]">Dashboard</span> */}
                  <span className="font-semibold text-[1.4rem]">
                    Welcome, Rogel!
                  </span>
                  <span className="text-[0.85rem] font-normal  tracking-wide mt-1.5 text-[#808088]">
                    Here's your data today.
                  </span>
                </div>


                <div className="px-9  w-full h-[calc(100%-8rem)] ">
                  <div className=" px-5 pb-4 pt-4 rounded-lg mt-2 cursor-pointer thin-box-divider bg-[#1e1e1e] flex flex-col h-fit w-60">
                    <div className=" flex flex-col w-fit">
                      <span className="text-xs font-normal  tracking-wide text-[#808088]">
                        Total notes
                      </span>
                      <span className=" mt-0.5 tracking-tighter text-white font-helveticaRegular text-[1.8rem] ">
                        52
                      </span>
                    </div>
                  </div>
                </div>
                {/* content */}
              </div>
            }
          />
          <Route path="/collection" element={<Collections />} />
        </Routes>
      </div>
  );
};

export default Home;
