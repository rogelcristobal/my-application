import React from "react";
import SearchBar from "../components/SearchBar";
import AuthContext from "../context/AuthContext";
const Blogs = () => {
  const { data, userLoading } = React.useContext(AuthContext);
  // if(!userLoading){
  //   console.log()
  // }
  return (
    <div>blogs</div>
  );
};

export default Blogs;
