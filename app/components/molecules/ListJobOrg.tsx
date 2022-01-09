import router from "next/router";
import React from "react";
import Moment from "react-moment";
import Link from "next/link";

const JobCard = (props) => {
  return (
    <div className="flex flex-col gap-2 pt-4">
      <div className="flex justify-between">
        <a
          href={"/job/" + props.id}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer max-w-xl text-blue-600 text-lg hover:underline"
        >
          {props.title} Sales Executive (Up To $5000)
        </a>
        <p className="text-gray-400">
          Expire in <Moment format="DD/MM/YYYY" date={props.expiredDate} />
        </p>
      </div>
      {/* content */}

      <div
        className="line-clamp-5 overflow-hidden"
        dangerouslySetInnerHTML={{ __html: props.description }}
      />
      <div className="flex justify-between">
        <div>
          <p>
            {props.city}HCM • {props.jobForm}Fulltime
          </p>
          <p>
            ${props.minSalary} 1.500 – ${props.maxSalary}2.500
          </p>
        </div>

        <Link href={"/job/" + props.id} passHref>
          <button
            className={`bg-blue-500 hover:bg-blue-600 h-10 px-10 text-white transition-colors duration-150 
          rounded-lg focus:shadow-outline`}
          >
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default function ListJobOrg({ jobs, styles }) {
  return (
    <div className={`${styles} flex flex-col`}>
      <p className="text-2xl font-semibold">
        We have {jobs.length} jobs for you
      </p>
      {jobs.map((item, index) => (
        <div key={index}>
          <JobCard {...item} />
          <hr className="my-4" />
        </div>
      ))}
    </div>
  );
}
