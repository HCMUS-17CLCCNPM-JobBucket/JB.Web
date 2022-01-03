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
  getUserDetail: () => {
    return axiosClient.get("/user/details", {});
  },
  getUserDetailVer2: () => {
    return axiosClient.get("/aggregate/user", {});
  },
  getUserDetailById: (userId) => {
    return axiosClient.get(`/aggregate/user/${userId}`, {});
  },
  updateUserDetail: (data) =>
    axiosClient.put("/aggregate/user/employee", data, {}),
  updateEmployerDetail: (data) =>
    axiosClient.put("/aggregate/user/company", data, {}),
  getListCompany: (page) =>
    axiosClient.post("/job/user/listCompany", {
      page: page,
      size: 10,
    }),
  getListEmployee: (page, keyword) =>
    axiosClient.post("/job/user/listEmployee", {
      keyword,
      page: page,
      size: 10,
    }),
  getProfile: () =>
    axiosClient.post("/graphql", {
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
            reference
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
    }),
  getProfileById: (id) =>
    axiosClient.post("/graphql", {
      query: `query getProfileById($id: Int) {
        profiles(id: $id) {
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
      variables: {
        id,
      },
    }),
  updateProfile: (data) =>
    axiosClient.post("graphql", {
      query: `mutation updateProfile ($updateProfile : UpdateUserProfileRequestInput) {
          profile {
            update (profile : $updateProfile)
            {
              id
            }
          }
        }`,
      variables: {
        updateProfile: data,
      },
    }),
  listEmployees: (page, keyword) =>
    axiosClient.post("/graphql", {
      query: `query getProfileById {
      profiles {
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
      variables: {
        page: page,
        keyword: keyword,
      },
    }),
};
export default UserAPI;
