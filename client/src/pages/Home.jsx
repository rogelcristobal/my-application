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
      <div className="h-screen w-full text-[#142c4a] flex items-start  justify-start relative">
        <Sidebar data={data} loading={isLoading}></Sidebar>
        <Routes>
          <Route
            index
            element={
              <div className="h-full  pt-10 w-full flex flex-col items-start justify-start">
                <div className="h-fit w-full flex  px-10 pb-6 flex-col">
                  <span className="mb-3 font-semibold text-[0.9rem] text-[#645cfc]">Dashboard</span>
                  <span className="font-semibold text-[1.5rem]">
                    Welcome, Admin!
                  </span>
                  <span className="text-[0.9rem] font-normal  tracking-wide mt-1.5 text-[#00c4c4]">
                    Here's your data today.
                  </span>
                </div>


                <div className="px-9  w-full h-[calc(100%-8rem)] ">
                  <div className=" px-5 pb-5 pt-3 rounded-lg mt-2 cursor-pointer thin-box-divider bg-white flex flex-col h-fit w-60">
                    <div className=" flex flex-col w-fit">
                      <span className="text-sm font-normal  tracking-wide text-[#00c4c4]">
                        Total notes
                      </span>
                      <span className=" mt-0.5 tracking-tighter font-helveticaRegular text-[1.8rem] ">
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
