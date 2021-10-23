import axiosClient from "../axiosClient";

export const jobAPI = {
  getAll: (filter) =>
    axiosClient.post("/graphql", {
      query: `
      query GetAllJobs($filter: ListJobType ) {
        jobs(filter: $filter) {
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
        filter,
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
            types{
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
        id: id,
      },
    }),

  like: (id: number) =>
    axiosClient.post("/graphql", {
      query: `
      query LikeJob($id: Int ) {
        job{
          interest(id: $id){
            id
          }
        }
      }
    `,
      variables: {
        id,
      },
    }),

  unlike: (id: number) =>
    axiosClient.post("/graphql", {
      query: `
      query unLikeJob($id: Int ) {
        job{
          interest(id: $id){
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
