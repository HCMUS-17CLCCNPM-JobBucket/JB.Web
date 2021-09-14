import JobCard from "app/components/atoms/JobCard";
import JobHorizonCard from "app/components/atoms/JobCard/JobHorizonCard";
import SearchJob from "app/components/atoms/SearchJob";
import Selection from "app/components/atoms/Selection";
import Checkbox from "app/components/atoms/Toggle/Checkbox";
import React from "react";

export default function index() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8];
  const filters = [1, 2, 3, 4];
  return (
    <div className="find-job">
      <div className="find-job__search">
        <SearchJob />
      </div>
      <div className="find-job__content">
        <div className="find-job__filter find-job__filter--left">
          <div>
            <p>Salary Range</p>
            {filters.map((item, index) => (
              <Checkbox
                key={index}
                active={true}
                content=">= $1"
                callback={() => console.log(123)}
              />
            ))}
          </div>
        </div>

        <div className="find-job__result">
          {list.map((item, index) => (
            <JobHorizonCard key={index} />
          ))}
        </div>

        <div className="find-job__filter find-job__filter--right">
          <div>
            <p>Salary Range</p>
            {filters.map((item, index) => (
              <Checkbox
                key={index}
                active={true}
                content=">= $1"
                callback={() => console.log(123)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
