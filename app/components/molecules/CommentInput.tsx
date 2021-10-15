import React from "react";

export default function CommentInput() {
  return (
    <div className="w-full flex items-center justify-center ">
      <form className="w-full bg-white pt-2">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-2 mt-2">
            <textarea
              className="bg-gray-200 rounded-xl  leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-600 ease-in-transition"
              name="body"
              placeholder="Type Your Comment"
              required
              defaultValue={""}
            />
          </div>
          <div className="w-full md:w-full flex items-center px-3">
            <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
              <svg
                fill="none"
                className="w-5 h-5 text-gray-600 mr-1"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-xs md:text-sm pt-px">Some HTML is okay.</p>
            </div>
            <button className="btn primary-btn">Comment</button>
          </div>
        </div>
      </form>
    </div>
  );
}
