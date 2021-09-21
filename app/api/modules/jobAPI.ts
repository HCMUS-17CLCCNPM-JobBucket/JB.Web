import axiosClient from "../axiosClient";

export const JobAPI = {
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
