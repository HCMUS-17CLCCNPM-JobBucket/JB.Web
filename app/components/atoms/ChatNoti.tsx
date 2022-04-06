import { useSubscription, gql } from "@apollo/react-hooks";
import { useUserInfo } from "app/utils/hooks";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

export default function ChatNoti() {
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
    if (data && user.user.id !== data.chat.senderId) {
      toast(data.chat.content);
    }
  }, [data]);
  return <></>;
}
