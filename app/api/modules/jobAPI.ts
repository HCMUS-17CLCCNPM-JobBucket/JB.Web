import axiosClient from "../axiosClient";

const city2ObjFilter = (city) =>
  city.map((item) => {
    return {
      property: "city",
      value: item.label,
      comparison: "==",
    };
  });

const JobAPI = {
  search: (keyword, city, category, page, token) => {
    let data = keyword != "" && { keyword: keyword };

    let cityFilter = city2ObjFilter(city);
    // console.log(page);
    let filters = [];
    if (city.length !== 0) filters.push(...cityFilter);
    const categoryObj = {
      property: "categoryId",
      value: category,
      comparison: "==",
    };
    if (category !== 0) filters.push(categoryObj);
    return axiosClient.post(
      "/job/search",
      { ...data, page: page, size: 10, filters: filters },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },
  getAll: (page) => {
    return axiosClient.post("/job/listJob", { page: page, size: 10 });
  },
  getAllWithUser: (page, token, keyword, city) => {
    let data;
    if (keyword != "" && city !== []) {
      data = { keyword: keyword };
      page = 0;
    } else data = {};

    // let cityFilter = city2ObjFilter(city);

    // let filters = cityFilter;
    return axiosClient.post(
      "/job/search",
      { ...data, page: page, size: 10 },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },
  getJobOfCompany: (id) => {
    return axiosClient.post("/job/listJob", {
      filters: [
        {
          property: "employer.id",
          value: id,
          comparison: "==",
        },
      ],
    });
  },
  getJobById: (id, token) =>
    token === ""
      ? axiosClient.get("/job/" + id)
      : axiosClient.get("/job/" + id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        }),
  postJob: (data, token) => {
    return axiosClient.post("/job/", data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
  deleteJobById: (id, token) => {
    return axiosClient.delete("/job/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
  changeJobById: (id, data, token) => {
    return axiosClient.put("/job/" + id, data, {
      headers: {
        Authorization: "Bearer " + token,
        // "content-type": "application/json",
      },
    });
  },
  getNumberOfJob: () => axiosClient.post("/job/count", {}),
  //interest section
  getJobInterest: (token) => {
    if (token !== "")
      return axiosClient.get("/job/interest", {
        headers: {
          Authorization: "Bearer " + token,
          // "content-type": "application/json",
        },
      });
  },
  addJobInterest: (id, token) => {
    return axiosClient.post(
      `/job/${id}/interest`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },
  deleteJobInterest: (id, token) => {
    return axiosClient.delete(`/job/${id}/interest`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
  //apply section
  getListJobApply: (token) => {
    return axiosClient.get("/job/apply", {
      headers: {
        Authorization: "Bearer " + token,
      },
      data: {},
    });
  },
  addJobApply: (id, token) => {
    return axiosClient.post(
      `/job/${id}/apply`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },
  getPostedJob: (token) => {
    return axiosClient.get(`/job/apply`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
  getUsersApplyPostedJob: (id, token) => {
    return axiosClient.get(`/job/${id}/apply`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
  deleteJobApply: (id, token) => {
    return axiosClient.delete(`/job/${id}/apply`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
  getJobApplyById: (id, token) => {
    return axiosClient.get(`/job/${id}/apply`, {
      data: {},
    });
  },

  //other
  getListPosition: () => axiosClient.get("/job/position"),
  getListEducation: () => axiosClient.get("/job/education"),
  getListSkill: () => axiosClient.get("/job/skill"),
  getCategories: () => axiosClient.get("/job/category"),
  //recommend
  getRecommendJobAtDetailJob: (id, token) =>
    axiosClient.get(`/job/${id}/recommend`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
  getAnalysis: () => axiosClient.get(`/statistics/searchCountByCategory`),
  getQuestion: (page) =>
    axiosClient.post(`/question/listQuestion`, { page, size: 20 }),
};

export default JobAPI;
