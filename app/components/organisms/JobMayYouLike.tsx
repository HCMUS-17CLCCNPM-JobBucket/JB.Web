import React from "react";
import VerticalJob from "../atoms/Job/VerticalJob";

export default function RandomJob() {
  const list = Array.from(Array(8).keys());
  return (
    <div className="xl:px-40 lg:px-24 md:px-16 px-8 py-24 mt-10">
      <p className="title-section text-center">Many Job You Might Like</p>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1  pt-16 pb-8 gap-8">
        {list.map((item, index) => (
          <VerticalJob key={index} />
        ))}
      </div>

      <div className="w-full flex justify-center">
        <button className="px-8 py-3 text-blue-600 font-semibold ease-in-trans uppercase rounded-full hover:bg-blue-600 hover:text-white border-2 border-blue-600 focus:outline-none">
          Find More Jobs
        </button>
      </div>
    </div>
  );
}
