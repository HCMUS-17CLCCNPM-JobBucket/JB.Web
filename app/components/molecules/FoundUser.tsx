import { LocationMarkerIcon } from "@heroicons/react/solid";
import { getAvatar } from "app/utils/getAvatar";
import router from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import Badge from "../atoms/Badge";

export default function FoundUser(props) {
  const handleChatClick = async () => {
    // const chatRes = await chatAPI.createConversationOfEmployer(
    //   user.token,
    //   props.jobId,
    //   props.id
    // );
    // if (chatRes.status === 200) router.push("/chat/" + chatRes.data.data.id);
  };
  return (
    <div className="col-span-1 bg-gray-50 border border-gray hover:shadow-lg ease-in-trans rounded-3xl p-4 m-4">
      <div className="flex flex-col gap-3 justify-center items-center px-3">
        <img
          src={props.avatarUrl || "/avatar/avatar.png"}
          alt=""
          className="rounded-full h-40 w-40 object-cover"
        />
        <div className="flex flex-col items-center">
          <a
            href={"/employee/" + props.id}
            target="_blank"
            rel="noreferrer"
            className="text-xl font-semibold"
          >
            {props.name}
          </a>
          {props.city && (
            <div className="flex gap-2">
              <LocationMarkerIcon className="h-6 w-6 text-gray-500" />
              {props.city}
            </div>
          )}
        </div>
        <p className="line-clamp-2 text-center text-gray-500">
          {props.introduction}
        </p>
        <div className="flex flex-wrap">
          {props.skills.map((item, index) => (
            <Badge key={index} content={item.skillName} />
          ))}
        </div>
      </div>
    </div>
  );
}
