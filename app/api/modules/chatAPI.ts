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
            id
            content
          }
        }
      }
      `,
    }),
  getMessages: (conversationId: number, page: number) =>
    axiosClient.post("graphql", {
      query: `query listMessage($conversationId: Int!,  ) {
        messages (conversationId : $conversationId
          filter: { sortBy: "createdDate", isDescending: false }) {
          id
          content
          conversationId
          sender {
            id
            name
          }
          createdDate
        }
      }
      `,
      variables: {
        conversationId,
        filter: {
          sortBy: "createdDate",
          isDescending: false,
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
