import { useUserInfo } from "app/utils/hooks";
import React from "react";
import Moment from "react-moment";
import InterviewButton from "./Button/InterviewButton";

const Avatar = ({ src, alt, name }) => (
  <div className="flex gap-2 items-center">
    <img
      src={src || "/avatar/avatar.png"}
      alt=""
      className="rounded-full h-12 w-12"
    />
    <p>{name}</p>
  </div>
);

export default function InterviewCard(props) {
  console.log(props);
  const user = useUserInfo();
  return (
    <div className="job-horizon-card hover:shadow-lg relative w-full">
      <div className="job-horizon-card__header">
        <div className=" flex flex-col gap-4 items-start justify-start overflow-hidden">
          {/* <Avatar
            src={
              user.user.roleId === 1
                ? props.interviewer.avatarUrl
                : props.interviewee.avatarUrl
            }
            alt={
              user.user.roleId === 1
                ? props.interviewer.name
                : props.interviewee.name
            }
            name={
              user.user.roleId === 1
                ? props.interviewer.name
                : props.interviewee.name
            }
          /> */}
          <div>
            <p className="text-xl font-semibold">{props.job.title}</p>
            <p>{props.description}</p>
          </div>
        </div>
      </div>
      <div className="gap-4 flex flex-col md:flex-row md:justify-between md:items-center px-6 py-2 border-t">
        <div className="flex gap-2">
          <p className="text-blue-600 font-semibold">
            {props.status === 0
              ? "Open"
              : props.status === 1
              ? "Closed "
              : "Pending"}
          </p>
          <p className="md:block">
            - <span className="font-semibold">Interview Time</span>:{" "}
            <Moment format="ddd DD/MM/yyyy">{props.interviewTime}</Moment>
          </p>
        </div>
        {user.user.roleId === 2 && <InterviewButton {...props} />}
      </div>
    </div>
  );
}
