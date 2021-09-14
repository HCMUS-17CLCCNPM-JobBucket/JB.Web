import React from "react";
import JobCard from "../atoms/JobCard";

export default function JobMayYouLike() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="job-random">
      <p className="job-random__title">Jobs May You Like</p>
      <div className="job-random__list">
        {list.map((item, index) => (
          <JobCard key={index} />
        ))}
      </div>
    </div>
  );
}
