import React from "react";
import SalaryRange from "app/components/atoms/SalaryRange";
import LikeButton from "./Button/LikeButton";
import SaveJobButton from "./Button/SaveJobButton";

export default function RecJob(props) {
  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl hover:shadow-xl ease-in-trans bg-white border border-gray-200">
      <div className="flex gap-4">
        <img
          className="h-10 w-10 object-cover border border-gray-100 rounded-md "
          src={props.organization.avatarUrl || "/avatar/avatar.png"}
          alt="logo"
        />
        <div>
          <a
            href={"/company/" + props.organization.id}
            target="_blank"
            rel="noreferrer"
            className="font-semibold hover:text-blue-600"
          >
            {props.organization.name}
          </a>
          <p className="text-xs text-gray-400 line-clamp-1">
            {props.organization.addresses.length > 0 &&
              props.organization.addresses[0]}
          </p>
        </div>
      </div>
      <div className="cursor-pointer">
        <a
          href={"/job/" + props.id}
          target="_blank"
          rel="noreferrer"
          className="text-lg font-semibold cursor-pointer hover:text-blue-600"
        >
          {props.title}
        </a>
        <p className="text-sm text-gray-400">
          {props.types.length > 0 && props.types[0].name}
          {props.types.length * props.addresses.length !== 0 && " • "}
          {props.addresses.length > 0 && props.addresses[0]}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <SalaryRange minSalary={props.minSalary} maxSalary={props.maxSalary} />
        <SaveJobButton isInterested={props.isJobInterested} jobId={props.id} />
      </div>
    </div>
  );
}
