import React from "react";
import SalaryRange from "app/components/atoms/SalaryRange";
import LikeButton from "./Button/LikeButton";
import SaveJobButton from "./Button/SaveJobButton";

export default function RecJob(props) {
  console.log(props.types.length, props.addresses.length);
  return (
    // <a
    //   href={"/job/" + props.id}
    //   rel="noreferrer"
    //   target="_blank"
    //   className="flex gap-2 items-center hover:bg-gray-200 px-2 py-1 rounded-md cursor-pointer"
    // >
    //   <img
    //     src={props.imageUrls[0] || "https://via.placeholder.com/150"}
    //     alt=""
    //     className="h-10 w-10 object-cover rounded-md border border-gray-200"
    //   />
    //   <div className="flex flex-col flex-start">
    //     <p className="text-base line-clamp-1 font-semibold">{props.title}</p>
    //     <p className="text-xs text-gray-400">{props.organization.name}</p>
    //   </div>
    // </a>
    <div className="flex flex-col gap-4 p-4 rounded-xl hover:shadow-xl ease-in-trans bg-white border border-gray-200">
      <div className="flex gap-4">
        <img
          className="h-10 w-10 object-cover border border-gray-100 rounded-md "
          src={props.organization.avatarUrl || "/avatar/avatar.png"}
          alt="logo"
        />
        <div>
          <a
            href={"/job/" + props.id}
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
        <p className="text-lg font-semibold cursor-pointer">{props.title}</p>
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
