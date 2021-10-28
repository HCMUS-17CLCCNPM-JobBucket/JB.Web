import React, { useState } from "react";
import Comment from "./Comment";

export default function Reply({ length, childrenCmt, callback }) {
  {
    const [isOpened, setIsOpened] = useState(false);

    if (isOpened)
      return (
        <div className="px-16">
          <div className="flex flex-col gap-2 ">
            {childrenCmt.map((child, index) => (
              <Comment key={index} {...child} callback={callback} />
            ))}
          </div>
          <div
            onClick={() => setIsOpened(false)}
            className="flex items-center text-gray-400 hover:text-black hover:underline cursor-pointer"
          >
            <p>See less</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      );

    return (
      <div>
        {length > 0 && (
          <div
            onClick={() => setIsOpened(true)}
            className=" px-16 text-gray-400 mt-1 px-4 flex items-center gap-2 hover:underline cursor-pointer hover:text-gray-700 ease-in-transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 rotate-180"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <div className="text-sm font-semibold">{length} replies</div>
          </div>
        )}
      </div>
    );
  }
}
