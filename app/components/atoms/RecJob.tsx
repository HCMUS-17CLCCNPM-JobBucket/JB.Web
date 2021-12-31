import React from "react";

export default function RecJob(props) {
  return (
    <div className="flex gap-2 items-center hover:bg-gray-200 px-2 py-1 rounded-md cursor-pointer">
      <img
        src="https://www.gcreddy.com/wp-content/uploads/2021/08/7-million-jobs-can-disappear-by-2050-study-1579691557-1024x576.jpg"
        alt=""
        className="h-10 w-10 object-cover rounded-md border border-gray-200"
      />
      <div className="flex flex-col flex-start">
        <p className="text-base">ReactJs Development</p>
        <p className="text-xs text-gray-400">SG Technology</p>
      </div>
    </div>
  );
}
