import React, { useState } from "react";

export default function SearchJob(props) {
  return (
    <div
      className={`${props.styles} flex flex-col gap-2 lg:flex-row items-center rounded-lg lg:rounded-full border-2 border-gray-100`}
    >
      <div className="lg:w-5/6 w-full flex">
        <div className="w-2/3 flex gap-2 dark:text-white dark:bg-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            className="focus:outline-none w-full dark:text-white dark:bg-gray-900"
            type="text"
            placeholder="Job Type or Keyword"
          />
        </div>
        <div className="w-1/3 flex gap-2 dark:text-white dark:bg-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <input
            className="focus:outline-none w-full dark:text-white dark:bg-gray-900"
            type="text"
            placeholder="Job Type or Keyword"
          />
        </div>
      </div>
      <button
        type="button"
        className=" py-3 px-6 w-1/6 mt-4 lg:mt-0 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full"
      >
        Search
      </button>
    </div>
  );
}
