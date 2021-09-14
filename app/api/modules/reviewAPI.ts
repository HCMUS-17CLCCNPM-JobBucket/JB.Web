import axiosClient from "../axiosClient";

const reviewAPI = {
  getReviewJob: (id, page) =>
    axiosClient.post("/review/listReview/job/" + id, { page: page, size: 10 }),
  getReviewCompany: (id) =>
    axiosClient.post("/review/listReview/company/" + id, {}),
  getNumberReviewJob: (jobId) =>
    axiosClient.post(`/review/listReview/job/${jobId}/count`, {}),
  getNumberReviewCompany: (jobId) =>
    axiosClient.post(`/review/listReview/company/${jobId}/count`, {}),
  reviewJob: (content, rating, id, token) =>
    axiosClient.post(
      `/review`,
      {
        rating,
        content: content,
        jobId: id,
        sort: {
          property: "createdDate",
          isDescending: false,
        },
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  reviewCompany: (content, rating, jobId, token) =>
    axiosClient.post(
      `/review`,
      {
        rating,
        content: content,
        companyId: jobId,
        sort: {
          property: "createdDate",
          isDescending: false,
        },
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  getHistoryComment: (token) =>
    axiosClient.post(
      `/review/listReview/user`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  getNumberHistoryComment: (token) =>
    axiosClient.post(
      `/review/listReview/user/count`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  edit: (id, data, rating, token) =>
    axiosClient.put(
      `/review/` + id,
      {
        content: data,
        rating,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  delete: (id, token) =>
    axiosClient.delete(`/review/` + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
  like: (reviewId, token) =>
    axiosClient.post(
      `/review/${reviewId}/like`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  unlike: (reviewId, token) =>
    axiosClient.post(
      `/review/${reviewId}/like`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
};

export default reviewAPI;
