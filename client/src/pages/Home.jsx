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
      <div className="h-screen w-full text-[#20304f] flex items-start  justify-start relative">
        <Sidebar data={data} loading={isLoading}></Sidebar>
        <Routes>
          <Route
            index
            element={
              <div className="h-full  pt-10 w-full flex flex-col items-start justify-start">
                <div className="h-fit w-full flex  px-10 pb-6 flex-col">
                  <span className="font-semibold text-[1.25rem]">
                    Good Morning, Admin!
                  </span>
                  <span className="text-xs font-normal mt-1.5 text-[#a8adb7]">
                    Here's your data today.
                  </span>
                </div>

                <div></div>

                <div className="px-7  w-full h-[calc(100%-8rem)] ">
                  <div className="thin-box-divider px-5 pb-5 pt-3 rounded-lg mt-7 cursor-pointer hover:sample bg-white flex flex-col h-fit w-60">
                    <div className=" flex flex-col w-fit">
                      <span className="text-[0.775rem] font-normal text-[#a4a8c3]">
                        Total notes
                      </span>
                      <span className="font-semibold mt-0.5 tracking-tighter font-plus text-[1.8rem] ">
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
