// import { chatAPI } from "app/api/modules/chatAPI";
import { gql, useSubscription } from "@apollo/client";
import { chatAPI } from "app/api/modules/chatAPI";
import { getUserInfo } from "app/redux/store";
import { useEffect, useRef, useState } from "react";

export function useChat(
  pageNumber,
  conversationId,
  setPageNumber,
  // isChat,
  chatRef,
  value
) {
  console.log(conversationId);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [chats, setChats] = useState<any>([]);
  const [hasMore, setHasMore] = useState(false);
  const user = useUserInfo();

  const { data, loading: loadingChat } = useSubscription(
    gql`
      subscription waitForMessage($token: String!) {
        chat(token: $token) {
          id
          content
          senderId
          conversationId
          createdDate
        }
      }
    `,
    {
      variables: {
        token: user.token,
      },
    }
  );

  useEffect(() => {
    if (data) {
      setChats((chats) => [data.chat, ...chats]);
    }
  }, [data]);

  useEffect(() => {
    console.log("reload", pageNumber);
    setLoading(true);
    setError(false);
    const fetchData = async () => {
      const res = await chatAPI.getMessages(conversationId, pageNumber);
      console.log(res.data.data.messages);
      if (res.status === 200) {
        // if (res.data.data.messages !== chats) {
        const data1 = res.data.data.messages.reverse();
        setChats((prev: any) => [...prev, ...data1]);
      }
      setHasMore(res.data.data.messages.length > 0);
      setLoading(false);
      chatRef.current.scrollIntoView();
      // }
    };
    fetchData();
    return () => {};
  }, [pageNumber]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const fetchData = async () => {
      const res = await chatAPI.getMessages(conversationId, 1);
      if (res.status === 200) {
        setPageNumber(1);
        setChats(res.data.data.messages.reverse());
        setHasMore(res.data.data.messages.length > 0);
        setLoading(false);
        if (res.data.data.messages.length !== 0 && chatRef.current)
          chatRef.current.scrollIntoView();
      }
    };
    fetchData();
    return () => {};
  }, [conversationId]);
  return { loadingChat: loading, error, chats, hasMore };
}

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const useUserInfo = () => getUserInfo();
