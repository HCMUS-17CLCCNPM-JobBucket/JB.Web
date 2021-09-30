import axiosClient from "../axiosClient";

export const JobAPI = {
  getAll: (filter) =>
    axiosClient.post("/graphql", {
      query: `
      query {
        jobs {
          id
          title
          jobForm
          description
          address
          imageUrls
          expireDate
          minSalary
          maxSalary
        }
      }
    `,
      variables: {
        // id,
        ...filter,
      },
    }),
  getJobById: (id: number) =>
    axiosClient.post("/graphql", {
      query: `
        query Job($id: ID!) {
          jobs(id: $id) {
            title
            organization {
              name
            }
            address
            views
            jobForm
            expireDate
            createdDate
            benefits
            description
            experiences
            requirements
            minSalary
            maxSalary
            skills {
              id
              name
            }
            imageUrls
            positions {
              id
            }
          }
        }
      `,
      variables: {
        id,
      },
    }),
};
