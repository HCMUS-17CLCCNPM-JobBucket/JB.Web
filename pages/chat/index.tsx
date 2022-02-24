// import { chatAPI } from "app/api/modules/chatAPI";
import { chatAPI } from "app/api/modules/chatAPI";
import { getAvatar } from "app/utils/getAvatar";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ChatCard(props) {
  return (
    <div className="flex gap-2">
      <img src="" alt="" className="" />
      <div className="flex flex-col">
        <div className="font-bold">{props.name} 123</div>
        <div className="text-sm">{props.lastMessage} </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const user = useSelector((state: any) => state.user);
  const [conversations, setConversations] = useState([]);
  console.log(conversations);
  useEffect(() => {
    const fetchData = async () => {
      const res = await chatAPI.getConversations();
      console.log(res.data.data.conversations);
      if (res.status === 200) {
        setConversations(res.data.data.conversations);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col py-8 pl-6 pr-2 lg:w-64 w-16 bg-white flex-shrink-0 overflow-hidden">
          <div
            onClick={() => router.push("/job")}
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
          {/* <div className="flex flex-row items-center justify-center h-12 w-full">
            <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <div className="ml-2 font-bold text-2xl">QuickChat</div>
          </div> */}
          {/* <div className="hidden lg:flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
            <div className="h-20 w-20 rounded-full border overflow-hidden">
              <img
                src={getAvatar(user.user.avatarUrl)}
                alt="Avatar"
                className="h-full w-full"
              />
            </div>
            <div className="text-sm font-semibold mt-2">
              {user.user.fullName}
            </div>
            <div className="flex flex-row items-center mt-3">
              <div className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full">
                <div className="h-3 w-3 bg-white rounded-full self-end mr-1" />
              </div>
              <div className="leading-none ml-1 text-xs">Active</div>
            </div>
          </div> */}
          <div className="flex flex-col mt-8" id="style-1">
            <div className="hidden lg:flex flex-row items-center justify-between text-xs">
              <span className="font-bold">Conversations</span>
              <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                {conversations.length}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {conversations.map((item, index) => (
              <ChatCard key={index} lastMessage={item.lastMessage} />
            ))}
          </div>
        </div>
        <div className="flex flex-col flex-auto h-full p-2 lg:p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <div className="flex gap-4 bg-white  rounded-xl px-4 py-2 items-center">
              <img
                // src={getAvatar(headerInfo.avatarUrl)}
                alt=""
                className="h-10 w-10 border rounded-full"
              />
              {/* <p className="text-lg font-semibold">{headerInfo.fullName}</p> */}
            </div>
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="flex flex-col-reverse gap-4"></div>
              </div>
            </div>
            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
              <div>
                <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="ml-4">
                <button className="p-2 rounded-full hover:bg-gray-200 ease-in-trans focus:outline-none">
                  {/* <span>Send</span> */}
                  <svg
                    className="crt8y2ji"
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,10.118014 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.8376543,3.0486314 1.15159189,3.99121575 L3.03521743,10.4322088 C3.03521743,10.5893061 3.34915502,10.7464035 3.50612381,10.7464035 L16.6915026,11.5318905 C16.6915026,11.5318905 17.1624089,11.5318905 17.1624089,12.0031827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z"
                      fill="#0084FF"
                      fillRule="evenodd"
                      stroke="none"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
