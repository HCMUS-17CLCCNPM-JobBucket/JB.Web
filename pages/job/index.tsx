import { apolloClient } from "app/api/apolloClient";
import JobHorizonCard from "app/components/atoms/JobCard/JobHorizonCard";
import SearchJob from "app/components/atoms/SearchJob";
import Checkbox from "app/components/atoms/Toggle/Checkbox";
import gql from "graphql-tag";
import React, { useState } from "react";

export default function index() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8];
  const filters = [1, 2, 3, 4];

  const [jobs, setJobs] = useState<any>([]);

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
            <p>Salary Range</p>

            <div className="find-job__checkboxes">
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
          <div>
            <p>Salary Range</p>

            <div className="find-job__checkboxes">
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

        <div className="find-job__result">
          {jobs.map((item, index) => (
            <JobHorizonCard key={index} {...item} />
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
