import React from "react";

export default function ProgressBar({ rating, value }) {
  return (
    <div key={rating} className="flex items-center mt-1">
      <div className=" w-1/5 text-indigo-500 tracking-tighter">
        <span>{rating} star</span>
      </div>
      <div className="w-3/5">
        <div className="bg-gray-300 w-full rounded-lg h-2">
          <div
            className="h-full rounded-lg bg-blue-600"
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
      <div className="w-1/5 text-gray-700 pl-3">
        <span className="text-sm">{value}%</span>
      </div>
    </div>
  );
}
