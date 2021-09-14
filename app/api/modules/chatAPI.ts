import axiosClient from "../axiosClient";

export const chatAPI = {
  getAll: (token) =>
    axiosClient.post(
      "/chat/listConversation",
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  getAllByJob: (token, jobId) =>
    axiosClient.post(
      `/chat/${jobId}/listConversation`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  createConversation: (token, jobId) =>
    axiosClient.post(
      `/chat/${jobId}/start`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  createConversationOfEmployer: (token, jobId, userId) =>
    axiosClient.post(
      `/chat/${jobId}/employer/start/${userId}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  getListChat: (token, conversationId, page) =>
    axiosClient.post(
      `/chat/${conversationId}/listChat`,
      { page: page, size: 15 },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  getListConversationByJobId: (token, jobId) =>
    axiosClient.post(
      `/chat/${jobId}/listConversation`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
};
