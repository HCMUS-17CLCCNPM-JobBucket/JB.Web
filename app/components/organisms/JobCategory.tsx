import React, { useState } from "react";

function JobCategoryItem(props) {
  const [active, setActive] = useState(false);
  return (
    <div
      onMouseMove={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={`job-category__item`}
    >
      <img src={props.children} alt="" className="job-category__img" />

      <div>
        <p className="job-category__name">{props.name}</p>
        <p className="job-category__number-job">{props.value} jobs available</p>
      </div>
    </div>
  );
}

export default function JobCategory() {
  const list = Array.from(Array(8).keys());
  return (
    <div className="job-category">
      <p className="job-category__title">Job Category</p>
      <div className="job-category__list">
        {list.map((item, index) => (
          <JobCategoryItem
            key={index}
            styles="col-span-1 "
            name="Design & Development"
            value={58}
          >
            home/design.svg
          </JobCategoryItem>
        ))}
      </div>
    </div>
  );
}
