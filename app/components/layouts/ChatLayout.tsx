// import { chatAPI } from "app/api/modules/chatAPI";
import { chatAPI } from "app/api/modules/chatAPI";
import { getAvatar } from "app/utils/getAvatar";
import { useUserInfo } from "app/utils/hooks";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChatCard } from "../atoms/ChatCard";

export default function ChatLayout(props) {
  const user = useUserInfo();
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await chatAPI.getConversations();
      if (res.status === 200) {
        setConversations(res.data.data.conversations);
      }
    };
    fetchData();
  }, [props.chats]);

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div
          className="flex flex-col py-8 px-1 md:pl-6 md:pr-2 md:w-64 sm:w-16 w-12
         bg-white flex-shrink-0"
        >
          <div
            onClick={() => router.back()}
            className="flex gap-1 lg:gap-2 cursor-pointer text-gray-500 hover:text-black ease-in-trans"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Back
          </div>
          <div className="flex flex-col ">
            <div className="hidden md:flex flex-row items-center justify-between text-xs">
              <span className="font-bold text-lg">Conversations</span>
              <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                {conversations.length}
              </span>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              {conversations.map((item, index) => (
                <ChatCard
                  key={index}
                  id={item.id}
                  organization={item.organization}
                  name={
                    item.users[0].id === user.user.id
                      ? item.users[1].name
                      : item.users[0].name
                  }
                  lastMessage={
                    item.lastMessage !== null && item.lastMessage.content
                  }
                  avatarUrl={item.users[1].avatarUrl || "/avatar/avatar.png"}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-auto h-full p-2 pl-0 lg:p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}
