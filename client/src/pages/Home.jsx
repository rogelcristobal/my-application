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
  const navigate = useNavigate();
  const { currentUser,userDataLoading } = React.useContext(AuthContext);
  const logOutUser = async () => {
    try {
      await auth.signOut();
      console.log("User signed out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if(!userDataLoading){
   
    console.log('monggodb:',currentUser)
  }
  

  return (
    <div className="h-full  w-full flex flex-col items-start justify-start relative">
      <div className=" h-full overflow-y-scroll  px-0 w-full">
        <div className="h-fit w-full flex   pb-0 items-start flex-col justify-start">
         
        </div>

        <div className=" w-full  h-[120%]  mt-4">
       
        </div>
      </div>
    </div>
  );
};

export default Home;
