import { jobAPI } from "app/api/modules/jobAPI";
import React, { useEffect, useState } from "react";

function JobCategoryItem(props) {
  const [active, setActive] = useState(false);
  return (
    <div
      onMouseMove={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={`${props.styles} w-full cursor-pointer p-6 bg-white flex gap-4 rounded-xl hover:shadow-xl hover:bg-blue-600 ease-in transition-all 0.5s"`}
    >
      <img src={props.children} alt="" className="h-10 w-10" />

      <div>
        <p
          className={`${
            active ? "text-white" : "text-black"
          } text-xl font-semibold`}
        >
          {props.title}
        </p>
        <p
          className={`${
            active ? "text-white" : "text-gray-400"
          } mt-2  capitalize`}
        >
          {props.value} jobs available
        </p>
      </div>
    </div>
  );
}

export default function JobCategory() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await jobAPI.jobCount();
      setData(res.data.data.jobCounts.byCategories);
    };
    fetchData();
  }, []);
  return (
    <div className="w-full bg-gray-100 xl:px-40 lg:px-24 md:px-16 px-8 py-24 mt-24">
      <p className="title-section text-center">Job Category</p>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-16">
        {data.slice(0, 8).map((item, index) => (
          <JobCategoryItem
            key={index}
            styles="col-span-1 "
            title={item.name}
            value={item.totalCount}
          >
            home/design.svg
          </JobCategoryItem>
        ))}
      </div>
    </div>
  );
}
