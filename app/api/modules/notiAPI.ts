import axiosClient from "../axiosClient";

const notiAPI = {
  getAll: () =>
    axiosClient.post("graphql", {
      query: `query getNoti {
        notifications(filter: { sortBy: "createdDate", isDescending: true }) {
          id
          seenByUser
          message
          createdDate
        }
      }`,
    }),
};

export default notiAPI;
