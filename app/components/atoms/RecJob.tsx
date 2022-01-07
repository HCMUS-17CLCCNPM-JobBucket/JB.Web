import React from "react";

export default function RecJob(props) {
  return (
    <div className="flex gap-2 items-center hover:bg-gray-200 px-2 py-1 rounded-md cursor-pointer">
      <img
        src={props.imageUrls[0] || "https://via.placeholder.com/150"}
        alt=""
        className="h-10 w-10 object-cover rounded-md border border-gray-200"
      />
      <div className="flex flex-col flex-start">
        <p className="text-base line-clamp-1 font-semibold">{props.title}</p>
        <p className="text-xs text-gray-400">{props.organization.name}</p>
      </div>
    </div>
  );
}
