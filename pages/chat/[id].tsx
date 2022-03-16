// import * as signalR from "@microsoft/signalr";
import { chatAPI } from "app/api/modules/chatAPI";
import EmployerBox from "app/components/atoms/EmployerBox";
import ChatLayout from "app/components/layouts/ChatLayout";
import { useChat } from "app/utils/hooks";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export const getServerSideProps = async ({ params }) => {
  return {
    props: { id: parseInt(params.id) },
  };
};
export default function MyComponent(props) {
  const chatRef = useRef(null);
  const [value, setValue] = useState("");
  const user = useSelector((state: any) => state.user);
  const [conversations, setConversations] = useState([]);
  const [page, setPage] = useState(1);
  const [headerInfo, setHeaderInfo] = useState<any>({
    id: 0,
    avatarUrl: "",
    fullName: "",
    email: "",
  });

  //chat section
  const { chats, hasMore, loadingChat, error } = useChat(
    page,
    props.id,
    setPage,
    // isChat,
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

  useEffect(() => {
    const fetchData = async () => {
      const res = await chatAPI.getConversations();
      if (res.status === 200) {
        setConversations(res.data.data.conversations);

        const findConversation = res.data.data.conversations.find(
          (conversation) => conversation.id === props.id
        );
        if (findConversation) {
          setHeaderInfo(
            findConversation.users[0].id === user.user.id
              ? findConversation.users[1]
              : findConversation.users[0]
          );
        }
      }
    };
    if (user.token !== "") fetchData();
  }, [props.id, chats]);

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

  return (
    <ChatLayout chats={chats}>
      <div className="flex flex-col h-full overflow-x-auto mb-4">
        <div className="sticky top-0 flex gap-4 bg-white  rounded-xl px-4 py-2 items-center z-50">
          <img
            src={headerInfo.avatarUrl || "/avatar/avatar.png"}
            alt=""
            className="h-10 w-10 border rounded-full"
          />
          <p className="text-lg font-semibold">{headerInfo.name}</p>
        </div>
        {/* <div className=" flex flex-col"> */}
        <div className="flex-1 flex flex-col-reverse gap-1">
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
        {/* </div> */}
      </div>

      <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
        <div className="flex-grow">
          <div className="relative w-full">
            <input
              type="text"
              value={value}
              onChange={(val) => setValue(val.target.value)}
              placeholder="Aa"
              onKeyPress={handleKeyPress}
              className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
            />
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
    </ChatLayout>
  );
}
