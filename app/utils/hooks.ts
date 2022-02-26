// import { chatAPI } from "app/api/modules/chatAPI";
import { gql, useSubscription } from "@apollo/client";
import { chatAPI } from "app/api/modules/chatAPI";
import { getUserInfo } from "app/redux/store";
import { useEffect, useRef, useState } from "react";

export function useChat(
  pageNumber,
  conversationId,
  setPageNumber,
  isChat,
  chatRef,
  value
) {
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
    setLoading(true);
    setError(false);
    const fetchData = async () => {
      const res = await chatAPI.getMessages(conversationId, pageNumber);
      if (res.status === 200) {
        if (res.data.data.messages !== chats) {
          setChats((prev: any) => {
            return [...prev, ...res.data.data.messages];
          });
        }
        setHasMore(res.data.data.messages.length > 0);
        setLoading(false);
        if (pageNumber === 0) chatRef.current.scrollIntoView();
      }
    };
    if (pageNumber !== 0) fetchData();
    return () => {};
  }, [pageNumber]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const fetchData = async () => {
      const res = await chatAPI.getMessages(conversationId, 0);
      if (res.status === 200) {
        setPageNumber(0);
        setChats(res.data.data.messages);
        setHasMore(res.data.data.messages.length > 0);
        setLoading(false);
        if (res.data.data.messages.length !== 0 && chatRef.current)
          chatRef.current.scrollIntoView();
      }
    };
    fetchData();
    return () => {};
  }, [conversationId, isChat]);
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
