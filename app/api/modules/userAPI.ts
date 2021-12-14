import axiosClient from "../axiosClient";

const UserAPI = {
  login: (params) => {
    const url = "/user/Login";
    return axiosClient.post(url, { ...params });
  },
  loginWithGoogle: (values) =>
    axiosClient.post("/user/login/google", {}, { params: { ...values } }),
  register: (params) => {
    const url = "/user/register";
    return axiosClient.post(url, { ...params });
  },
  resend: (email) =>
    axiosClient.get("/user/ResendConfirmationEmail", { params: { email } }),
  resetPassword: (email) => {
    return axiosClient.get("/user/ResetPassword", { params: { email } });
  },
  confirmResetPassword: (email) => {
    return axiosClient.post("/user/confirmResetPassword", {
      params: { email },
    });
  },
  getAccessToken: (token) => {
    return axiosClient.post("/user/refreshToken", { refreshToken: token });
  },
  getUserDetail: (token) => {
    return axiosClient.get("/user/details", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
  getUserDetailVer2: (token) => {
    return axiosClient.get("/aggregate/user", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
  getUserDetailById: (userId, token) => {
    return axiosClient.get(`/aggregate/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
  updateUserDetail: (data, token) =>
    axiosClient.put("/aggregate/user/employee", data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
  updateEmployerDetail: (data, token) =>
    axiosClient.put("/aggregate/user/company", data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
  getListCompany: (page) =>
    axiosClient.post("/job/user/listCompany", {
      page: page,
      size: 10,
    }),
  getListEmployee: (page, token, keyword) =>
    axiosClient.post(
      "/job/user/listEmployee",
      {
        keyword,
        page: page,
        size: 10,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  getProfile: (token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `query getProfileById {
          profiles (myProfile : true) {
            id
            userName
            skills {
              skillName
              level
            }
            name
            email
            awards
            introduction
            gender
            avatarUrl
            createdDate
            updatedDate
            address
            introduction
            website
            birthdate
            phone
            github
            experiences {
              company
              position
              duration
            }
            educations {
              school
              major
              status
              profession
            }
            activities
            certifications
            views
          }
        }`,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  updateProfile: (data, token) =>
    axiosClient.put("/aggregate/user/profile", data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
};
export default UserAPI;
