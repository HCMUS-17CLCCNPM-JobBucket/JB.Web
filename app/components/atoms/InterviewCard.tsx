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
  const user = useUserInfo();
  return (
    <div className="w-full rounded-lg flex gap-16 border border-gray-400 p-4">
      <div>
        <p className="text-lg">
          <Moment format="ddd DD/MM/yyyy">{props.interviewTime}</Moment>
        </p>
        <div className="flex">
          <Avatar
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
          />
        </div>
      </div>
      <div className="flex flex-1 justify-between">
        <div>
          <p className="text-xl font-semibold">{props.job.title}</p>
          <p className="text-gray-500">{props.description}</p>
        </div>
        <InterviewButton {...props} />
      </div>
    </div>
  );
}
