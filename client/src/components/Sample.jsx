import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { DateTime } from "luxon";
const Sample = ({ data }) => {
  const { collectionID } = useParams();
  // const formattedTime = DateTime.fromJSDate(createdAt).setZone('Asia/Manila').toFormat('yyyy-MM-dd hh:mm:ss a')

  return (
    <div className="text-[#7c8292] space-y-3 h-full overflow-y-auto pb-16">
      {data[collectionID]?.savedNotes?.map((item, id) => (
        <div key={id} className="view text-black">
          <p className="font-medium first-letter:uppercase">{item.title}</p>
          <p>{item.content}</p>

          <p>{DateTime.fromISO(item.createdAt).setZone('Asia/Manila').toFormat('ccc dd, yyyy')}</p>

        </div>
      ))}
    </div>
  );
};

export default Sample;
