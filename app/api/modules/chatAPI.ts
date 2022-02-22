import axiosClient from "app/api/axiosClient";

export const chatAPI = {
  getConversation: (conversationId: string) =>
    axiosClient.post("graphql", {
      query: `query getConversationById {
        conversations (id : 1) {
          id
          userIds
          users {
            id
            name
          }
          createdDate
          updatedDate
          lastMessage {
            id
            content
          }
        }
      }
      `,
    }),
  getConversations: () => () =>
    axiosClient.post("graphql", {
      query: `query listConversation {
        conversations {
          id
          userIds
          users {
            id
            name
          }
          createdDate
          updatedDate
          lastMessage {
            id
            content
          }
        }
      }
      `,
    }),
  getMessages: (conversationId: string) => (conversationId: string) =>
    axiosClient.post("graphql", {
      query: `query listMessage {
        messages (conversationId : 1) {
          id
          content
          conversationId
          sender {
            id
            name
          }
        }
      }
      `,
    }),
  addMessage:
    (conversationId: string, content: string) => (conversationId: string) =>
      axiosClient.post("graphql", {
        query: `mutation addMessage {
            chat {
              addMessage (message : {
                content : "hello there again",
                receiverId : 40,
                conversationId : 1, (dùng receiverId HOẶC conversationId)
                type : 1
              })
              {
                id
                content
              }
            }
          }
      `,
      }),
};
