import axiosClient from "../axiosClient";

const reportAPI = {
  report: (token, data) =>
    axiosClient.post("/report", data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
  getTags: (token) =>
    axiosClient.get("/report/tag", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
};
export default reportAPI;
