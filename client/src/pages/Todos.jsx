import React from "react";
import SearchBar from "../components/SearchBar";
import AuthContext from "../context/AuthContext";
const Todos = () => {
  const { data, userLoading } = React.useContext(AuthContext);
  // if(!userLoading){
  //   console.log()
  // }
  return (
   <div>todos</div>
  );
};

export default Todos;
