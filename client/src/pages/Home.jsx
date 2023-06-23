import React from "react";
import Sidebar from "../components/Sidebar";
import AuthContext from "../context/AuthContext";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import {
  RiQuestionLine,
  RiFile2Line,
  RiCheckboxMultipleLine,
  RiMore2Fill,
} from "react-icons/ri";
import { LuFile ,LuCheckSquare} from "react-icons/lu";
import SearchBar from "../components/SearchBar";
Sidebar;
const Home = () => {
  const { currentUser,userDataLoading } = React.useContext(AuthContext);


  return (
    <div className="h-full  w-full flex flex-col items-start justify-start relative">
      <div className=" h-full overflow-y-scroll pt-6 px-12 w-full">
        

        <div className=" w-fit gap-4  h-[120%] grid grid-flow-col mt-4">
          <div className="view h-fit flex items-start flex-col justify-end p-4 w-52">
            <span className="text-sm">total notes</span>
            <span>{userDataLoading? <span>loading</span> : currentUser.totalNotes}</span>
          </div>

          <div className="view h-fit flex items-start flex-col justify-end p-4 w-52">
            <span className="text-sm">total todos</span>
            <span>{userDataLoading? <span>loading</span> : currentUser.totalTodos}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
