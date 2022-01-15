import axiosClient from "../axiosClient";

const notiAPI = {
  getAll: () =>
    axiosClient.post("graphql", {
      query: `query getNoti {
        notifications {
          id
          seenByUser
          message
        }
      }`,
    }),
};

export default notiAPI;
