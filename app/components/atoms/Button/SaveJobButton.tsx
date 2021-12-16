import { jobAPI } from "app/api/modules/jobAPI";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function SaveJobButton({ isInterested, jobId }) {
  const [isSaved, setIsSaved] = useState(isInterested);
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    if (isInterested !== isSaved) {
      setIsSaved(isInterested);
    }
  }, [isInterested]);

  const handleClick = async () => {
    if (user.token !== "")
      if (isSaved === true) {
        const res = await jobAPI.unlike(jobId);
        setIsSaved(false);
      } else {
        const res = await jobAPI.like(jobId);
        setIsSaved(true);
      }
  };
  return (
    <button
      onClick={handleClick}
      type="button"
      disabled={user.token === ""}
      className={
        (user.token === "" ? "cursor-not-allowed " : "") +
        (isSaved
          ? "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
          : "bg-blue-600 text-white ") +
        " inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium "
      }
    >
      <svg
        className="-ml-1 mr-2 h-5 w-5 "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
          clipRule="evenodd"
        />
        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
      </svg>
      <p>{isSaved ? "Saved" : "Save "}</p>
    </button>
  );
}
