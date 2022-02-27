import axiosClient from "app/api/axiosClient";

export const chatAPI = {
  getConversationById: (conversationId: string) =>
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
  getConversations: () =>
    axiosClient.post("graphql", {
      query: `query listConversation {
        conversations {
          id
          userIds
          users {
            avatarUrl
            id
            name
          }
          createdDate
          updatedDate
          lastMessage {
            sender{
              name
            }
            id
            content
          }
          organization{
            name
            avatarUrl
          }
        }
      }
      `,
    }),
  getMessages: (conversationId: number, page: number) =>
    axiosClient.post("graphql", {
      query: `query listMessage($conversationId: Int!, $filter: ListMessageRequestInput  ) {
        messages (conversationId : $conversationId
          filter: $filter) {
          id
          content
          conversationId
          
          senderId
          createdDate
        }
      }
      `,
      variables: {
        conversationId,
        filter: {
          sortBy: "createdDate",
          isDescending: true,
          page,
          size: 10,
        },
      },
    }),
  addMessage: (conversationId: string, content: string) =>
    axiosClient.post("graphql", {
      query: `mutation addMessage($message: AddMessageRequestInput) {
        chat {
          addMessage(message: $message) {
            id
            content
            conversationId
          }
        }
      }
      `,
      variables: {
        message: {
          conversationId,
          content,
          receiverId: -1,
          type: 1,
        },
      },
    }),
};
