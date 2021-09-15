import { useQuery } from "@apollo/client";
import { apolloClient } from "app/api/apolloClient";
import { JobAPI } from "app/api/modules/jobAPI";
import gql from "graphql-tag";
import React from "react";
import Moment from "react-moment";

export const getServerSideProps = async ({ params }) => {
  return {
    props: { id: params.id },
  };
};

export default function JobDetail(props) {
  const { loading, error, data } = useQuery(JobAPI.GET_JOB_BY_ID, {
    variables: { id: props.id },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  const job = data.jobs[0];
  console.log(job);
  return (
    <div className="job-details">
      <div className="job-details__header">
        <div className="job-details__header-left">
          <img src={job.imageUrls[0]} alt="Nest" />
          <div>
            <p>{job.title}</p>
            <p>{job.organization.name}</p>
            <p>Location: {job.address}</p>
            <p>
              Salary Range: ${job.minSalary} - ${job.maxSalary}
            </p>
            <p>
              {job.views} views - Expires in{" "}
              {<Moment format="DD/MM/YYYY " date={job.expireDate} />}
            </p>
          </div>
        </div>
        <div className="job-details__header-right">
          <button className="btn">Apply</button>
          <button className="btn">Save</button>
        </div>
      </div>
      <div className="job-details__section">
        <p className="job-details__title">Benefits</p>
        <div>{job.benefits}</div>
      </div>
      <div className="job-details__section">
        <p className="job-details__title">Description</p>
        <div>{job.description}</div>
      </div>
      <div className="job-details__section">
        <p className="job-details__title">Requirements</p>
        <div>{job.requirements}</div>
      </div>
      <div className="job-details__section">
        <p className="job-details__title">Skills</p>
        <div>
          {job.skills.map((item) => (
            <p key={item.id}>{item.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
