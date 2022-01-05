import React from "react";
import RatingComponent from "./RatingComponent";

export default function SubReviewItem({ label, value, callback }) {
  return (
    <div className="flex items-center">
      <p className="w-40">{label}</p>
      <RatingComponent
        value={value}
        callback={callback}
        styles=""
        quiet={false}
      />
    </div>
  );
}
