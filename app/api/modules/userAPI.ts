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
            profileStatus
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
              avatarUrl
            }
          }
        }`,
      variables: {
        updateProfile: data,
      },
    }),
  listEmployees: (page, keyword) =>
    axiosClient.post("/graphql", {
      query: `query getProfileById($filter: ListUserProfileRequestInput) {
      profiles(filter: $filter) {
        id
        userName
        skills {
          skillName
          level
        }
        name
        city
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
        filter: { page, size: 10, keyword, roleId: 1 },
      },
    }),

  getRecEmployees: (page, filters, jobId) =>
    axiosClient.post("/graphql", {
      query: `query getProfileById($filter: ListUserProfileRequestInput) {
      profileRecommendations (filter: $filter) {
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
        filter: {
          page,
          size: filters?.size === null ? 10 : filters.size,
          roleId: 1,
          ...filters,
          jobId,
          userId: filters?.userId === null ? -1 : filters.userId,
        },
      },
    }),
  getApplicants: (employerId, filters) =>
    axiosClient.post("/graphql", {
      query: `query getApplicants($filter: ListJobApplicationRequestInput) {
        jobApplications(filter: $filter) {
          cVId
          cVPDFUrl
          createdDate
          job {
            id
            title
            imageUrls
            
          }
          status
          user {
            id
            name
            phoneNumber
            email
            avatarUrl
          }
        }
      }
      `,
      variables: {
        filter: {
          ...filters,
          employerId,
          size: 10,
        },
      },
    }),
};
export default UserAPI;
