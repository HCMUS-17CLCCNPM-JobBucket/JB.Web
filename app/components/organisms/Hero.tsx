import React from "react";
import SearchJob from "../atoms/SearchBar/SearchJob";

export default function Hero() {
  return (
    <div className="flex flex-col items-center gap-8 mt-16 ">
      <div className="capitalize md:text-6xl text-5xl font-bold flex flex-col items-center space-y-4">
        <p className="dark:text-white">
          Get the <span className="text-blue-600"> Right Job</span>
        </p>
        <p className="text-black dark:text-white">You Deserve</p>
      </div>
      <p className="text-gray-400 font-semibold dark:text-gray-400">
        1,232,120 jobs listed here!Your dream job is waiting
      </p>
      {/* <SearchJob styles="mt-8 lg:w-1/2 w-5/6 mx-8 px-2 py-1 hover:shadow-lg" /> */}
    </div>
  );
}
