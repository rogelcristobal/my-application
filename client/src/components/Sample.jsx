import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
const Sample = () => {
    const {collectionID} = useParams()
  return (
   <> page_id:{collectionID}</>
  );
};

export default Sample;
