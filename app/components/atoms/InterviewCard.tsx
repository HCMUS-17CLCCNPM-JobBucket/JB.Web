import ScheduleStatus from "app/enums/ScheduleStatus";
import { useUserInfo } from "app/utils/hooks";
import Router from "next/router";
import React, { useState } from "react";
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
    <div className="col-span-1 job-horizon-card hover:shadow-lg relative w-full">
      <div className="job-horizon-card__header">
        <div className=" flex flex-col gap-4 items-start justify-start overflow-hidden">
          <div className="flex justify-between w-full">
            <Avatar
              src={props.interviewee.avatarUrl}
              alt={props.interviewee.name}
              name={props.interviewee.name}
            />
            <Avatar
              src={props.interviewer.avatarUrl}
              alt={props.interviewer.name}
              name={props.interviewer.name}
            />
          </div>
          <div className="flex flex-col gap-2">
            <a
              className="text-xl font-semibold"
              onClick={() => Router.push(props.job.id)}
            >
              {props.job.title}
            </a>
            <p>{props.description}</p>

            <div>
              <p className="md:block">
                <span className="font-semibold">Interview Time</span>:{" "}
                <Moment format="ddd DD/MM/yyyy">{props.interviewTime}</Moment>
              </p>
              <p>
                <span className="font-semibold text-blue-600">Round:</span>{" "}
                {props.currentInterviewRound}
              </p>

              <p>
                <span className="font-semibold text-blue-600">
                  Total Round:
                </span>{" "}
                {props.totalInterviewRound}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="gap-4 flex flex-col md:flex-row md:justify-between md:items-center px-6 py-2 border-t">
        <div className="flex gap-2">
          <p className="text-red-600 font-semibold">
            {ScheduleStatus[props.status]}
          </p>
          {/* <p className="md:block">
            - <span className="font-semibold">Interview Time</span>:{" "}
            <Moment format="ddd DD/MM/yyyy">{props.interviewTime}</Moment>
          </p> */}
        </div>
        {user.user.roleId === 2 && props.status === 0 && (
          <div className="flex justify-center gap-2">
            <button className="bg-red-600 text-white w-28 rounded-md">
              Fail
            </button>
            <button className="bg-green-500 text-white w-28 rounded-md">
              Pass
            </button>
            <InterviewButton {...props} />
          </div>
        )}

        {user.user.roleId === 2 && props.status === 2 && (
          <button>Reschedule</button>
        )}

        {user.user.roleId === 1 && props.status === 0 && (
          <div className="flex gap-4">
            <button className="w-20 text-red-600 hover:bg-red-50 rounded-md">
              Deny
            </button>
            <button className="w-20 btn btn-primary">Accept</button>
          </div>
        )}
      </div>
    </div>
  );
}
