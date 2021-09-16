import React, { useState } from "react";

import { apolloClient } from "app/api/apolloClient";
import gql from "graphql-tag";

import JobHorizonCard from "app/components/atoms/JobCard/JobHorizonCard";
import SearchJob from "app/components/atoms/SearchJob";
import Checkbox from "app/components/atoms/Toggle/Checkbox";

export default function SearchJobPage() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8];
  const filters = [1, 2, 3, 4];

  const [jobs, setJobs] = useState<any>([]);
  const [activated, setActivated] = useState(false);
  apolloClient
    .query({
      query: gql`
        query {
          jobs {
            id
            title
            description
            address
            imageUrls
            expireDate
            minSalary
            maxSalary
          }
        }
      `,
    })
    .then((result) => setJobs(result.data.jobs));
  return (
    <div className="find-job">
      <div className="find-job__search">
        <SearchJob />
      </div>
      <div className="find-job__content">
        <div className="find-job__filter find-job__filter--left">
          <div>
            <p onClick={() => setActivated(!activated)}>Type of Employment</p>

            <div
              className={`${
                activated && "find-job__checkboxes--active"
              } find-job__checkboxes`}
            >
              <Checkbox
                active={false}
                content="Full Time Jobs"
                callback={() => console.log(123)}
              />
              <Checkbox
                active={false}
                content="Part Time Jobs"
                callback={() => console.log(123)}
              />
              <Checkbox
                active={false}
                content="Remote Jobs"
                callback={() => console.log(123)}
              />
              <Checkbox
                active={false}
                content="Internship Jobs"
                callback={() => console.log(123)}
              />
            </div>
            {/* 
              {filters.map((item, index) => (
                <Checkbox
                  key={index}
                  active={true}
                  content=">= $1"
                  callback={() => console.log(123)}
                />
              ))}
            </div> */}
          </div>
          <div>
            <p onClick={() => setActivated(!activated)}>Level</p>

            <div
              className={`${
                activated && "find-job__checkboxes--active"
              } find-job__checkboxes`}
            >
              <Checkbox
                active={false}
                content="Student"
                callback={() => console.log(123)}
              />
              <Checkbox
                active={false}
                content="Junior"
                callback={() => console.log(123)}
              />
              <Checkbox
                active={false}
                content="Mid"
                callback={() => console.log(123)}
              />
              <Checkbox
                active={false}
                content="Senior"
                callback={() => console.log(123)}
              />
              <Checkbox
                active={false}
                content="Direct"
                callback={() => console.log(123)}
              />
            </div>
          </div>
        </div>

        <div className="find-job__result">
          {jobs.map((item, index) => (
            <JobHorizonCard key={index} {...item} />
          ))}
        </div>

        <div className="find-job__filter find-job__filter--right">
          <div>
            <p onClick={() => setActivated(!activated)}>Type of Employment</p>

            <div
              className={`${
                activated && "find-job__checkboxes--active"
              } find-job__checkboxes`}
            >
              <Checkbox
                active={false}
                content="Full Time Jobs"
                callback={() => console.log(123)}
              />
              <Checkbox
                active={false}
                content="Part Time Jobs"
                callback={() => console.log(123)}
              />
              <Checkbox
                active={false}
                content="Remote Jobs"
                callback={() => console.log(123)}
              />
              <Checkbox
                active={false}
                content="Internship Jobs"
                callback={() => console.log(123)}
              />
            </div>
          </div>
          <div>
            <p onClick={() => setActivated(!activated)}>Level</p>

            <div
              className={`${
                activated && "find-job__checkboxes--active"
              } find-job__checkboxes`}
            >
              <Checkbox
                active={false}
                content="Student"
                callback={() => console.log(123)}
              />
              <Checkbox
                active={false}
                content="Junior"
                callback={() => console.log(123)}
              />
              <Checkbox
                active={false}
                content="Mid"
                callback={() => console.log(123)}
              />
              <Checkbox
                active={false}
                content="Senior"
                callback={() => console.log(123)}
              />
              <Checkbox
                active={false}
                content="Direct"
                callback={() => console.log(123)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
