// import { chatAPI } from "app/api/modules/chatAPI";
import { useEffect, useState } from "react";

export function useChat(
  pageNumber,
  token,
  conversationId,
  setPageNumber,
  isChat,
  chatRef
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [chats, setChats] = useState<any>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    const fetchData = async () => {
      // const res = await chatAPI.getListChat(token, conversationId, pageNumber);
      // if (res.status === 200) {
      //   // const temp = chats.concat(res.data.data);
      //   if (res.data.data !== chats) {
      //     setChats((prev: any) => {
      //       return [...prev, ...res.data.data];
      //     });
      //   }
      //   setHasMore(res.data.data.length > 0);
      //   setLoading(false);
      //   if (pageNumber === 0) chatRef.current.scrollIntoView();
      // }
    };
    if (pageNumber !== 0) fetchData();
    return () => {};
  }, [pageNumber]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    const fetchData = async () => {
      // const res = await chatAPI.getListChat(token, conversationId, 0);
      // if (res.status === 200) {
      //   setPageNumber(0);
      //   setChats(res.data.data);
      //   setHasMore(res.data.data.length > 0);
      //   setLoading(false);
      //   if (res.data.data.length !== 0) chatRef.current.scrollIntoView();
      // }
    };
    fetchData();
    return () => {};
  }, [conversationId, isChat]);
  return { loading, error, chats, hasMore };
}
