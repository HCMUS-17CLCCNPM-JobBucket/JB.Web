import React from "react";

export default function ApplyButton({ active }) {
  return (
    <button
      className={`${
        active
          ? "bg-blue-600 text-white"
          : "bg-blue-200 text-blue-700 cursor-not-allowed"
      } px-4 py-2 rounded-md font-semibold`}
    >
      Apply
    </button>
  );
}
