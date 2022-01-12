import { jobAPI } from "app/api/modules/jobAPI";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import RecJob from "../atoms/RecJob";

export default function JobRecSection({ jobId }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    jobAPI
      .jobRecommendation(parseInt(jobId))
      .then((res) => {
        setData(res.data.data.jobRecommendations);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="w-full">
      <p className="text-xl font-semibold text-gray-500">
        Similar jobs for you
      </p>
      <div className="mt-4 flex flex-col gap-3 ">
        {data.map((item, index) => (
          <div key={index}>
            <RecJob {...item} />
            <hr className="p-0 m-0 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
}
