// import * as signalR from "@microsoft/signalr";
import { gql, useSubscription } from "@apollo/client";
import { chatAPI } from "app/api/modules/chatAPI";
import EmployerBox from "app/components/atoms/EmployerBox";
// import EmployerBox from "app/components/atoms/chat/EmployerBox";
// import Conversation from "app/components/molecules/conversation";
import { getAvatar } from "app/utils/getAvatar";
import { useChat } from "app/utils/hooks";
import router from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export const getServerSideProps = async ({ params }) => {
  return {
    props: { id: parseInt(params.id) },
  };
};
export default function MyComponent(props) {
  const chatRef = useRef(null);
  const [isChat, setIsChat] = useState(false);
  const [value, setValue] = useState("");
  const user = useSelector((state: any) => state.user);
  const [conversations, setConversations] = useState([]);
  const [page, setPage] = useState(0);
  const [headerInfo, setHeaderInfo] = useState<any>({
    id: 0,
    avatarUrl: "",
    fullName: "",
    email: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await chatAPI.getConversations();
      if (res.status === 200) {
        setConversations(res.data.data.conversations);
      }
    };
    if (user.token !== "") fetchData();
  }, [props.id]);

  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await chatAPI.getMessages(parseInt(props.id));
  //     if (res.status === 200) {
  //       setMessages(res.data.data.messages);
  //     }
  //     console.log(res.data.data.messages);
  //   };
  //   fetchData();
  // }, []);

  const handleKeyPress = async (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      return;
    } else if (e.key === "Enter") {
      handleSend();
    }
  };
  const handleSend = async () => {
    if (value !== "") {
      const res = await chatAPI.addMessage(props.id, value);
      if (res.status === 200) {
        setValue("");
      }
    }
  };
  // connection.on("Message", function (message) {
  //   //On receive message
  //   setIsChat(!isChat);
  // });

  const { chats, hasMore, loadingChat, error } = useChat(
    page,
    props.id,
    setPage,
    isChat,
    chatRef,
    value
  );
  const observer = useRef(null);
  const lastChatElementRef = useCallback(
    (node) => {
      if (chatRef === null) return;
      if (loadingChat) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadingChat, hasMore]
  );
  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col py-8 pl-6 pr-2 lg:w-64 w-16 bg-white flex-shrink-0">
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

          {/* <div className="hidden lg:flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
            <div className="h-20 w-20 rounded-full border">
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
          <div className="flex flex-col ">
            <div className="hidden lg:flex flex-row items-center justify-between text-xs">
              <span className="font-bold">Conversations</span>
              <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                {conversations.length}
              </span>
            </div>
            <div className="flex flex-col space-y-1 mt-4 -mx-2 h-96 hover:visible overflow-auto invisible">
              {/* <Conversation id={props.id} conversations={conversations} /> */}
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-auto h-full p-2 lg:p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <div className="flex gap-4 bg-white  rounded-xl px-4 py-2 items-center">
              <img
                src={getAvatar(headerInfo.avatarUrl)}
                alt=""
                className="h-10 w-10 border rounded-full"
              />
              <p className="text-lg font-semibold">{headerInfo.fullName}</p>
            </div>
            {/* messages section */}
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="flex flex-col-reverse gap-4">
                  {chats.map((item, index) => {
                    if (index === 0 && chatRef !== null) {
                      return (
                        <div key={index} ref={chatRef}>
                          <EmployerBox {...item} />
                        </div>
                      );
                    }
                    if (chats.length - 3 === index) {
                      return (
                        <div key={index} ref={lastChatElementRef}>
                          <EmployerBox {...item} />
                        </div>
                      );
                    } else {
                      return <EmployerBox key={index} {...item} />;
                    }
                  })}
                  <div ref={chatRef}></div>
                </div>
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
                  <input
                    type="text"
                    value={value}
                    onChange={(val) => setValue(val.target.value)}
                    placeholder="Aa"
                    onKeyPress={handleKeyPress}
                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                  />
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
                <button
                  onClick={handleSend}
                  className="p-2 rounded-full hover:bg-gray-200 ease-in-trans focus:outline-none"
                >
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
