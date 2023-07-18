import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
const Sample = () => {
    const {collectionID} = useParams()
  return (
   <div className="text-[#7c8292] ">{collectionID}</div>
  );
};

export default Sample;
