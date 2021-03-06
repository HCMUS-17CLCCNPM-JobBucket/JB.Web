import { chatAPI } from "app/api/modules/chatAPI";
import interviewAPI from "app/api/modules/interviewAPI";
import ScheduleStatus from "app/enums/ScheduleStatus";
import { useUserInfo } from "app/utils/hooks";
import Router from "next/router";
import React, { useState } from "react";
import Moment from "react-moment";
import NextRoundButton from "./Button/NextRoundButton";
import InterviewButton from "./Button/NextRoundButton";
import SetScheduleInterviewButton from "./Button/SetScheduleInterviewButton";
import SummaryButton from "./Button/SummaryButton";

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
  const onAccept = async () => {
    const res = await interviewAPI.accept(props.id);

    props.onRefresh();
  };

  const onDeny = async () => {
    const res = await interviewAPI.deny(props.id);

    props.onRefresh();
  };

  const onReschedule = async (newTime, closeModal) => {
    const res = await interviewAPI.reschedule(props.id, newTime);

    closeModal();
    props.onRefresh();
  };

  const onFail = async () => {
    const res = await interviewAPI.fail(props.id);
    props.onRefresh();
  };
  const onPass = async () => {
    const res = await interviewAPI.pass(props.id);
    props.onRefresh();
  };
  const onMessage = async () => {
    const res = await chatAPI.createConversation(
      user.user.roleId === 2 ? props.intervieweeId : props.interviewerId
    );
    if (res.status === 200) {
      Router.push(`/chat/${res.data.data.chat.addOrGet.id}`);
    }
  };

  return (
    <div className="col-span-1 job-horizon-card hover:shadow-lg relative w-full">
      <div className="job-horizon-card__header">
        <div className="flex flex-col gap-4 items-start justify-start overflow-hidden">
          <div className="flex justify-between w-full">
            {user.user.roleId === 2 && (
              <Avatar
                src={props.interviewee.avatarUrl}
                alt={props.interviewee.name}
                name={props.interviewee.name}
              />
            )}

            {user.user.roleId === 1 && (
              <div className="flex justify-between w-2/3">
                <Avatar
                  src={props.interviewer.avatarUrl}
                  alt={props.interviewer.name}
                  name={props.interviewer.name}
                />

                <Avatar
                  src={props.organization.avatarUrl}
                  alt={props.organization.name}
                  name={props.organization.name}
                />
              </div>
            )}
            <img
              src="/common/message.png"
              alt="Message"
              className="h-8 w-8 cursor-pointer"
              onClick={onMessage}
            />
            {/* <button className="btn btn-primary h-10 w-24" onClick={onMessage}>
              Message
            </button> */}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <a
              className="text-xl font-semibold"
              onClick={() => Router.push(props.job.id)}
            >
              {props.job.title}
            </a>

            <p>{props.description || "No Description"}</p>

            <div className="flex justify-between items-end w-full">
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
              <SummaryButton
                id={props.id}
                jobId={props.job.id}
                round={props.currentInterviewRound}
                interviewTime={props.interviewTime}
                forms={props.forms}
                onRefresh={props.onRefresh}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="gap-4 flex flex-col md:flex-row md:justify-between md:items-center px-6 py-2 border-t">
        <div className="flex gap-2">
          <p
            className={`${
              props.status === 3 ? "text-green-500" : "text-red-600"
            }  font-semibold`}
          >
            {ScheduleStatus[props.status + 1]}
          </p>
          {/* <p className="md:block">
            - <span className="font-semibold">Interview Time</span>:{" "}
            <Moment format="ddd DD/MM/yyyy">{props.interviewTime}</Moment>
          </p> */}
        </div>
        {user.user.roleId === 2 && props.status === 1 && (
          <div className="flex justify-center gap-2">
            <button
              className="bg-red-600 text-white w-28 h-10 rounded-md"
              onClick={onFail}
            >
              Fail
            </button>
            <button
              className="bg-green-500 text-white w-28 h-10 rounded-md"
              onClick={onPass}
            >
              Pass
            </button>

            {props.currentInterviewRound !== props.totalInterviewRound && (
              <NextRoundButton
                id={props.id}
                round={props.currentInterviewRound}
                onRefresh={props.onRefresh}
              />
            )}
          </div>
        )}

        {user.user.roleId === 2 && props.status === 2 && (
          // <button className="w-40 btn btn-primary" onClick={onReschedule}>
          //   Reschedule
          // </button>
          <SetScheduleInterviewButton
            jobId={props.job.id}
            // description={"123123"}
            onReschedule={onReschedule}
            interviewTime={props.interviewTime}
            intervieweeCVId={-1}
            intervieweeId={props.interviewee.id}
            interviewerId={props.interviewer.id}
            totalInterviewRound={props.totalInterviewRound}
          />
        )}

        {user.user.roleId === 1 && props.status === 0 && (
          <div className="flex gap-4">
            <button
              className="w-20 text-red-600 hover:bg-red-50 rounded-md"
              onClick={onDeny}
            >
              Deny
            </button>
            <button className="w-20 btn btn-primary" onClick={onAccept}>
              Accept
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
