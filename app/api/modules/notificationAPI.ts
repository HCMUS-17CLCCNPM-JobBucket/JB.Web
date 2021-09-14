import axiosClient from "../axiosClient";

export const notiAPI = {
  getNotiNew: (token) =>
    axiosClient.post("/notification/listNotification/new", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
  getAll: (token) =>
    axiosClient.post("/notification/listNotification/new", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
  markAsSeen: (token) =>
    axiosClient.post("/notification/markAsSeen", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
};
