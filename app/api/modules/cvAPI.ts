import axiosClient from "../axiosClient";

export const CvAPI = {
  getAll: (token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
      query {
        cv {
          id
          cVName
        }
      }
    `,
        variables: {},
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),

  delete: (id, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
      mutation deleteCV($id: Int!) {
        cv{
          delete(id: $id){ 
            id
          }
        }
      }
    `,
        variables: {
          id,
        },
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),

  getCvById: (id: number, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
        query cv($id: Int!) {
  cv (id : $id) {
    id
    cVName
    name
    title
    avatarUrl
    gender
    birthdate
    email
    phone
    address
    introduction
    website
    github
    reference
    skills {
			level
      skillName
    }
    userId
    cVTemplate
    createdDate
    updatedDate
    educations {
			school
      major
      status
      profession
    }
    experiences {
			company
      duration
      position
    }
    activities
    certifications
    awards
  }
}
      `,
        variables: {
          id,
        },
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  add: (cv, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
      mutation addCV($cv: AddCVRequestInput!) {
        cv{
          add(cv: $cv){ 
            id
          }
        }
      }
    `,
        variables: {
          cv,
        },
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  update: (cv, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
           mutation updateCV ($cv: UpdateCVRequestInput!) {
            cv{
              update(cv: $cv){ 
                id
              }
            }
          }
        `,
        variables: {
          cv,
        },
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
};
