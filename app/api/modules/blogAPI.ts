import axiosClient from "../axiosClient";

const blogAPI = {
  search: (keyword, page, token) =>
    axiosClient.post(
      "/blog/searchBlog",
      { keyword, page },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  post: (data, token) =>
    axiosClient.post("/blog", data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
  update: (data, id, token) =>
    axiosClient.put("/blog/" + id, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
  delete: (id, token) =>
    axiosClient.delete("/blog/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
  getLikedBlog: (token) =>
    axiosClient.get("/blog/interest", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),

  getPostedBlog: (token) =>
    axiosClient.post(
      "/blog/listBlog/user",
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  getAll: (page, token) => {
    const url = "/blog/listBlog";
    return axiosClient.post(
      url,
      { page: page },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },
  getCount: () => {
    const url = "/blog/count";
    return axiosClient.post(url, {});
  },

  getBlogById: (id) => axiosClient.get("/blog/" + id),
  getBlogRecommendById: (id) =>
    axiosClient.get(`/blog/recommend?blogId=${id}&count=5`),
  getBlogCommentById: (id, token) =>
    token == ""
      ? axiosClient.get(`/blog/${id}/comment`)
      : axiosClient.get(`/blog/${id}/comment`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        }),
  addBlogComment: (id, content, token) =>
    axiosClient.post(
      `/blog/${id}/comment`,
      { content: content },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  addsSubBlogComment: (id, parentId, content, token) =>
    axiosClient.post(
      `/blog/${id}/comment`,
      { content: content, parentId: parentId },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  deleteBlogComment: (blogId, token, commentId) =>
    axiosClient.delete(`/blog/${blogId}/comment/` + commentId, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
  editBlogComment: (blogId, token, commentId, comment) =>
    axiosClient.put(
      `/blog/${blogId}/comment/` + commentId,
      { content: comment },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  likeBlog: (blogId, token) =>
    axiosClient.post(
      `/blog/${blogId}/interest`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  unlikeBlog: (blogId, token) =>
    axiosClient.delete(`/blog/${blogId}/interest`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
  likeComment: (blogId, commentId, token) =>
    axiosClient.post(
      `/blog/${blogId}/comment/${commentId}/interest`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  unlikeComment: (blogId, commentId, token) =>
    axiosClient.delete(`/blog/${blogId}/comment/${commentId}/interest`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
};

export default blogAPI;
