import React from "react";
import ProgressBar from "./ProgressBar";

export default function ReviewOrgBoard({ values }) {
  let list = Array(5)
    .fill(0)
    .map((_, index) => {
      return { rating: index + 1, percentage: 0 };
    });

  if (values.data.length > 0) {
    values.data.map((item) => {
      list.findIndex((element) => {
        if (element.rating === item.rating) {
          element.percentage = item.percentage;
        }
      });
    });
  }

  return (
    <div className="w-1/3">
      <div className="bg-white shadow-lg rounded-lg px-4 py-4">
        <div className="mb-1 tracking-wide px-4 py-4">
          <h2 className="text-gray-800 font-semibold mt-1">
            {values.total} reviews
          </h2>
          <div className="border-b -mx-8 px-8 pb-3">
            {list.map((item, index) => (
              <ProgressBar
                key={index}
                rating={item.rating}
                value={item.percentage.toFixed(1)}
              />
            ))}
          </div>
        </div>
        <div className="w-full px-4">
          <button className="btn btn-primary h-12 w-full">
            See all rating and reviews
          </button>
        </div>
      </div>
    </div>
  );
}
