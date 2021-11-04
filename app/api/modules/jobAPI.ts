import axiosClient from "../axiosClient";

export const jobAPI = {
  add: (job, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
          mutation addJob($job: AddJobType) {
            job{
              add(job: $job){ 
                id
              }
            }
          }
    `,
        variables: {
          job,
        },
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  getAll: (filter, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
      query GetAllJobs($filter: ListJobType ) {
        jobs(filter: $filter) {
          id
          title
          jobForm
          isJobApplied
    			isJobInterested
          description
          addresses
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
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  getJobById: (id: number, token: string) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
        query Job($id: ID!) {
          jobs(id: $id) {
            isJobApplied
    			  isJobInterested
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
  getJobByIdWithoutToken: (id: number) =>
    axiosClient.post("/graphql", {
      query: `
        query Job($id: ID!) {
          jobs(id: $id) {
            id
            title
            organization {
              name
            }
            types{
              name
            }
            addresses
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

  like: (id: number, token: string) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
        mutation LikeJob($id: Int ) {
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
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),

  unlike: (id: number, token: string) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
      mutation unLikeJob($id: Int ) {
        job{
          uninterest(id: $id){
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
};
